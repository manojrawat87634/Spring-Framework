package com.example.jdbc_sessions.repository;

import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

import com.example.jdbc_sessions.models.TicketAssignItemModel;

@Repository
public class TicketAssignedItemRepository {

    private final DataSource dataSource;

    public TicketAssignedItemRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // ==============================
    // ASSIGN ITEM (Manual Session)
    // ==============================
    public void assignItem(TicketAssignItemModel item) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {

            try {
                conn.setAutoCommit(false);

                String checkStockSql =
                        "SELECT quantity FROM purchase_items WHERE item_id = ?";
                try (PreparedStatement checkPs =
                             conn.prepareStatement(checkStockSql)) {

                    checkPs.setInt(1, item.getItemId());
                    ResultSet rs = checkPs.executeQuery();

                    if (!rs.next())
                        throw new SQLException("Item not found");

                    int availableStock = rs.getInt("quantity");

                    if (availableStock < item.getQuantity())
                        throw new SQLException("Not enough stock");
                }

                String insertSql =
                        "INSERT INTO ticket_assigned_items (ticket_id, item_id, quantity) VALUES (?, ?, ?)";
                try (PreparedStatement insertPs =
                             conn.prepareStatement(insertSql)) {

                    insertPs.setInt(1, item.getTicketId());
                    insertPs.setInt(2, item.getItemId());
                    insertPs.setInt(3, item.getQuantity());
                    insertPs.executeUpdate();
                }

                String updateStockSql =
                        "UPDATE purchase_items SET quantity = quantity - ? WHERE item_id = ?";
                try (PreparedStatement updatePs =
                             conn.prepareStatement(updateStockSql)) {

                    updatePs.setInt(1, item.getQuantity());
                    updatePs.setInt(2, item.getItemId());
                    updatePs.executeUpdate();
                }

                conn.commit();

            } catch (Exception e) {
                conn.rollback();
                throw e;
            }
        }
    }

    // ==============================
    // FIND ALL
    // ==============================
    public List<TicketAssignItemModel> findAll() throws SQLException {

        List<TicketAssignItemModel> list = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(
                     "SELECT * FROM ticket_assigned_items")) {

            while (rs.next()) {
                TicketAssignItemModel t =
                        new TicketAssignItemModel();

                t.setTicketItemId(rs.getInt("ticket_item_id"));
                t.setTicketId(rs.getInt("ticket_id"));
                t.setItemId(rs.getInt("item_id"));
                t.setQuantity(rs.getInt("quantity"));

                list.add(t);
            }
        }

        return list;
    }

    // ==============================
    // FIND BY TICKET
    // ==============================
    public List<TicketAssignItemModel> findByTicketId(int ticketId)
            throws SQLException {

        List<TicketAssignItemModel> list = new ArrayList<>();

        String sql =
                "SELECT * FROM ticket_assigned_items WHERE ticket_id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, ticketId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                TicketAssignItemModel t =
                        new TicketAssignItemModel();

                t.setTicketItemId(rs.getInt("ticket_item_id"));
                t.setTicketId(rs.getInt("ticket_id"));
                t.setItemId(rs.getInt("item_id"));
                t.setQuantity(rs.getInt("quantity"));

                list.add(t);
            }
        }

        return list;
    }

    // ==============================
    // REMOVE (Manual Session)
    // ==============================
    public void removeAssignedItem(int ticketItemId)
            throws SQLException {

        try (Connection conn = dataSource.getConnection()) {

            try {
                conn.setAutoCommit(false);

                String selectSql =
                        "SELECT item_id, quantity FROM ticket_assigned_items WHERE ticket_item_id = ?";

                int itemId;
                int quantity;

                try (PreparedStatement selectPs =
                             conn.prepareStatement(selectSql)) {

                    selectPs.setInt(1, ticketItemId);
                    ResultSet rs = selectPs.executeQuery();

                    if (!rs.next())
                        throw new SQLException("Assignment not found");

                    itemId = rs.getInt("item_id");
                    quantity = rs.getInt("quantity");
                }

                try (PreparedStatement deletePs =
                             conn.prepareStatement(
                                     "DELETE FROM ticket_assigned_items WHERE ticket_item_id = ?")) {

                    deletePs.setInt(1, ticketItemId);
                    deletePs.executeUpdate();
                }

                try (PreparedStatement restorePs =
                             conn.prepareStatement(
                                     "UPDATE purchase_items SET quantity = quantity + ? WHERE item_id = ?")) {

                    restorePs.setInt(1, quantity);
                    restorePs.setInt(2, itemId);
                    restorePs.executeUpdate();
                }

                conn.commit();

            } catch (Exception e) {
                conn.rollback();
                throw e;
            }
        }
    }
}
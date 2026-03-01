package com.example.jdbc_sessions.repository;

import java.sql.*;
import java.util.*;

import javax.sql.DataSource;

import com.example.jdbc_sessions.models.Ticket;

import org.springframework.stereotype.Repository;

@Repository
public class TicketRepository {

    private final DataSource dataSource;

    public TicketRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // ==============================
    // SAVE
    // ==============================
    public void save(Ticket ticket) throws SQLException {

        String sql = "INSERT INTO tickets (inventory_id, title, status) VALUES (?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, ticket.getInventoryId());
            ps.setString(2, ticket.getTitle());
            ps.setString(3, ticket.getStatus());

            ps.executeUpdate();
        }
    }

    // ==============================
    // FIND ALL
    // ==============================
    public List<Ticket> findAll() throws SQLException {

        List<Ticket> list = new ArrayList<>();

        String sql = "SELECT * FROM tickets";

        try (Connection conn = dataSource.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                Ticket t = new Ticket();
                t.setTicketId(rs.getInt("ticket_id"));
                t.setInventoryId(rs.getInt("inventory_id"));
                t.setTitle(rs.getString("title"));
                t.setStatus(rs.getString("status"));

                list.add(t);
            }
        }

        return list;
    }

    // ==============================
    // UPDATE STATUS
    // ==============================
    public void updateStatus(int ticketId, String status) throws SQLException {

        String sql = "UPDATE tickets SET status=? WHERE ticket_id=?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, status);
            ps.setInt(2, ticketId);

            ps.executeUpdate();
        }
    }
}
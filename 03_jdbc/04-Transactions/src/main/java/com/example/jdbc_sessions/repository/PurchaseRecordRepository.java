package com.example.jdbc_sessions.repository;

import java.sql.*;
import java.util.*;

import javax.sql.DataSource;

import com.example.jdbc_sessions.models.PurchaseRecord;

import org.springframework.stereotype.Repository;

@Repository
public class PurchaseRecordRepository {

    private final DataSource dataSource;

    public PurchaseRecordRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // ==============================
    // SAVE
    // ==============================
    public void save(PurchaseRecord record) throws SQLException {

        String sql = "INSERT INTO purchase_records (item_id, quantity, price) VALUES (?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, record.getItemId());
            ps.setInt(2, record.getQuantity());
            ps.setDouble(3, record.getPrice());

            ps.executeUpdate();
        }
    }

    // ==============================
    // FIND ALL
    // ==============================
    public List<PurchaseRecord> findAll() throws SQLException {

        List<PurchaseRecord> list = new ArrayList<>();

        String sql = "SELECT * FROM purchase_records";

        try (Connection conn = dataSource.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {

                PurchaseRecord p = new PurchaseRecord();
                p.setPurchaseId(rs.getInt("purchase_id"));
                p.setItemId(rs.getInt("item_id"));
                p.setQuantity(rs.getInt("quantity"));
                p.setPrice(rs.getDouble("price"));

                list.add(p);
            }
        }

        return list;
    }
}
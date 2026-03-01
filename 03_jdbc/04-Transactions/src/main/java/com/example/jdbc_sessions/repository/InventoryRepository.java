package com.example.jdbc_sessions.repository;

import java.sql.*;
import java.util.*;

import javax.sql.DataSource;

import com.example.jdbc_sessions.models.InventoryModel;

import org.springframework.stereotype.Repository;

@Repository
public class InventoryRepository {

    private final DataSource dataSource;

    public InventoryRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // ==============================
    // SAVE
    // ==============================
    public void save(InventoryModel inv) throws SQLException {

        String sql = "INSERT INTO inventory (tag_no_cpu, display_tag, category, `condition`, domain, location, main_location, mac_address, manufacture_by, operating_system, processor, ram, storage, serial_no, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, inv.getTagNoCpu());
            ps.setString(2, inv.getDisplayTag());
            ps.setString(3, inv.getCategory());
            ps.setString(4, inv.getCondition());
            ps.setString(5, inv.getDomain());
            ps.setString(6, inv.getLocation());
            ps.setString(7, inv.getMainLocation());
            ps.setString(8, inv.getMacAddress());
            ps.setString(9, inv.getManufactureBy());
            ps.setString(10, inv.getOperatingSystem());
            ps.setString(11, inv.getProcessor());
            ps.setString(12, inv.getRam());
            ps.setString(13, inv.getStorage());
            ps.setString(14, inv.getSerialNo());
            ps.setString(15, inv.getStatus());

            ps.executeUpdate();
        }
    }

    // ==============================
    // FIND ALL
    // ==============================
    public List<InventoryModel> findAll() throws SQLException {

        List<InventoryModel> list = new ArrayList<>();

        String sql = "SELECT * FROM inventory";

        try (Connection conn = dataSource.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                InventoryModel i = new InventoryModel();
                i.setInventoryId(rs.getInt("inventory_id"));
                i.setTagNoCpu(rs.getString("tag_no_cpu"));
                i.setDisplayTag(rs.getString("display_tag"));
                i.setCategory(rs.getString("category"));
                i.setCondition(rs.getString("condition"));
                i.setStatus(rs.getString("status"));

                list.add(i);
            }
        }

        return list;
    }
}
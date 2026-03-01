package com.example.jdbc_sessions.repository;

import java.sql.*;
import java.util.*;

import javax.sql.DataSource;

import com.example.jdbc_sessions.models.ItemModel;

import org.springframework.stereotype.Repository;

@Repository
public class ItemRepository {

    private final DataSource dataSource;

    public ItemRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // ==============================
    // SAVE
    // ==============================
    public void save(ItemModel item) throws SQLException {

        String sql = "INSERT INTO items (name) VALUES (?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, item.getName());
            ps.executeUpdate();
        }
    }

    // ==============================
    // FIND ALL
    // ==============================
    public List<ItemModel> findAll() throws SQLException {

        List<ItemModel> list = new ArrayList<>();

        String sql = "SELECT * FROM items";

        try (Connection conn = dataSource.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                ItemModel i = new ItemModel();
                i.setItemId(rs.getInt("item_id"));
                i.setName(rs.getString("name"));
                list.add(i);
            }
        }

        return list;
    }
}
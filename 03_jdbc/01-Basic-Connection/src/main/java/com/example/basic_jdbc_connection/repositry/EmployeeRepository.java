package com.example.basic_jdbc_connection.repositry;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.basic_jdbc_connection.models.Employee;

import java.util.List;

@Repository
public class EmployeeRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Employee> findAll() {
        String sql = "SELECT * FROM employee"; // note table name

        return jdbcTemplate.query(sql, (rs, rowNum) -> new Employee(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email"),
                rs.getDate("doj") != null 
        ? rs.getDate("doj").toLocalDate() 
        : null,
                rs.getInt("age") == 0 ? null : rs.getInt("age") // handle null
        ));
    }
}
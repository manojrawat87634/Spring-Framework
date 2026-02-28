package com.example.prepared_statement.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.prepared_statement.models.Employee;

@Repository
public class EmployeeRepository {
    private final JdbcTemplate jdbcTemplate;

    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Employee> getEmployees() {
        String sql = "select * from employee";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Employee emp = new Employee();
            emp.setId(rs.getInt("id"));
            emp.setName(rs.getString("name"));
            emp.setEmail(rs.getString("email"));
            emp.setDoj(rs.getString("doj"));
            emp.setAge(rs.getInt("age"));
            return emp;
        });
    }

    public Employee getEmployeeById(int id) {
        String sql = "select * from employee where id = ?";

        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                Employee emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setEmail(rs.getString("email"));
                emp.setDoj(rs.getString("doj"));
                emp.setAge(rs.getInt("age"));
                return emp;
            }, id);
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {
            return null;
        }
    }


      public int editEmployee(Employee emp, Integer id) {
        String sql = "UPDATE employee SET name = ?, email = ?, doj = ?, age = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                emp.getName(),
                emp.getEmail(),
                emp.getDoj(),
                emp.getAge(),
                id);
    }

    
    public int addEmployee(Employee emp) {
        String sql = "insert into employee (name, email, doj, age) values (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, emp.getName(), emp.getEmail(), emp.getDoj(), emp.getAge());
    }

     public int deleteEmployee(int id) {
        String sql = "DELETE FROM employee WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
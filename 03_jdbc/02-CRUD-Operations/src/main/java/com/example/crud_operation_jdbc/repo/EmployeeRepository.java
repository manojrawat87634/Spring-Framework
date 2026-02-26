package com.example.crud_operation_jdbc.repo;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.crud_operation_jdbc.models.Employee;

@Repository
public class EmployeeRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Employee> getEmployees() {
        String sql = "SELECT * FROM employee";

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

    public int addEmployee(Employee emp) {
        String sql = "INSERT INTO employee (name, email, doj, age) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                emp.getName(),
                emp.getEmail(),
                emp.getDoj(),
                emp.getAge());
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

    public int deleteEmployee(int id) {
        String sql = "DELETE FROM employee WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}

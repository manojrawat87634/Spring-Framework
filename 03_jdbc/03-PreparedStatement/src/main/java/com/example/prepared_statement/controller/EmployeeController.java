package com.example.prepared_statement.controller;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.prepared_statement.models.Employee;
import com.example.prepared_statement.repository.EmployeeRepository;


@CrossOrigin(origins = "*")
@RestController
public class EmployeeController {
     private final EmployeeRepository employeeRepository;
     EmployeeController(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
     }
        @GetMapping("/employee")
        List<Employee> getEmployeesController(){
            return employeeRepository.getEmployees();
        };
        @PostMapping("/employee")
        public int addEmployeeController(@RequestBody Employee emp){
            return employeeRepository.addEmployee(emp);
        }
        @PutMapping("/employee/{id}")
        public int editEmployee(@PathVariable int id, @RequestBody Employee emp){
            return employeeRepository.editEmployee(emp, id);
        }

        @DeleteMapping("/employee/{id}")
        public int deleteEmployee(@PathVariable int id){
            return employeeRepository.deleteEmployee(id);
        }
}

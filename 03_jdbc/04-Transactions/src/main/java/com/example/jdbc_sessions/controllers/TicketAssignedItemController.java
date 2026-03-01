package com.example.jdbc_sessions.controllers;

import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
import java.util.List;

import com.example.jdbc_sessions.models.TicketAssignItemModel;
import com.example.jdbc_sessions.repository.TicketAssignedItemRepository;

@RestController
@RequestMapping("/api/assignments")
public class TicketAssignedItemController {

    private final TicketAssignedItemRepository repository;

    public TicketAssignedItemController(TicketAssignedItemRepository repository) {
        this.repository = repository;
    }

    // =====================================================
    // POST → Assign Item
    // =====================================================
    @PostMapping
    public String assignItem(@RequestBody TicketAssignItemModel item) throws SQLException {
        repository.assignItem(item);
        return "Item assigned successfully";
    }

    // =====================================================
    // GET → Get All Assignments
    // =====================================================
    @GetMapping
    public List<TicketAssignItemModel> getAll() throws SQLException {
        return repository.findAll();
    }

    // =====================================================
    // GET → Get By Ticket ID
    // =====================================================
    @GetMapping("/ticket/{ticketId}")
    public List<TicketAssignItemModel> getByTicket(@PathVariable int ticketId) throws SQLException {
        return repository.findByTicketId(ticketId);
    }

    // =====================================================
    // DELETE → Remove Assignment
    // =====================================================
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) throws SQLException {
        repository.removeAssignedItem(id);
        return "Assignment removed successfully";
    }
}
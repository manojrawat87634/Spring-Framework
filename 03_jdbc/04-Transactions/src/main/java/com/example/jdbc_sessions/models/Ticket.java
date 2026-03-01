package com.example.jdbc_sessions.models;

import java.sql.Timestamp;

public class Ticket {

    private int ticketId;
    private int inventoryId;
    private String title;
    private String status;
    private Timestamp createdAt;

    public Ticket() {}

    public Ticket(int inventoryId, String title, String status) {
        this.inventoryId = inventoryId;
        this.title = title;
        this.status = status;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public int getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
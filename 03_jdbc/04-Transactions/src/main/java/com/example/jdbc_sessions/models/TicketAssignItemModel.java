package com.example.jdbc_sessions.models;

public class TicketAssignItemModel {

    private int ticketItemId;
    private int ticketId;
    private int itemId;
    private int quantity;

    public TicketAssignItemModel() {}

    public TicketAssignItemModel(int ticketId, int itemId, int quantity) {
        this.ticketId = ticketId;
        this.itemId = itemId;
        this.quantity = quantity;
    }

    public int getTicketItemId() {
        return ticketItemId;
    }

    public void setTicketItemId(int ticketItemId) {
        this.ticketItemId = ticketItemId;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
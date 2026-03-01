package com.example.jdbc_sessions.models;

public class ItemModel {
    private int itemId;
    private String name;
    public ItemModel() {}

    public int getItemId() { return itemId; }
    public void setItemId(int itemId) { this.itemId = itemId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
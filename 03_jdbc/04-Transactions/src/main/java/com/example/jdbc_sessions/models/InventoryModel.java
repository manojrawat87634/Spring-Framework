package com.example.jdbc_sessions.models;
import java.sql.Timestamp;

public class InventoryModel {
    private int inventoryId;
    private String tagNoCpu;
    private String displayTag;
    private String category;
    private String condition;
    private String domain;
    private String location;
    private String mainLocation;
    private String macAddress;
    private String manufactureBy;
    private String operatingSystem;
    private String processor;
    private String ram;
    private String storage;
    private String serialNo;
    private String status;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Constructors
    public InventoryModel() {}

    // Getters and Setters
    public int getInventoryId() { return inventoryId; }
    public void setInventoryId(int inventoryId) { this.inventoryId = inventoryId; }

    public String getTagNoCpu() { return tagNoCpu; }
    public void setTagNoCpu(String tagNoCpu) { this.tagNoCpu = tagNoCpu; }

    public String getDisplayTag() { return displayTag; }
    public void setDisplayTag(String displayTag) { this.displayTag = displayTag; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMainLocation() { return mainLocation; }
    public void setMainLocation(String mainLocation) { this.mainLocation = mainLocation; }

    public String getMacAddress() { return macAddress; }
    public void setMacAddress(String macAddress) { this.macAddress = macAddress; }

    public String getManufactureBy() { return manufactureBy; }
    public void setManufactureBy(String manufactureBy) { this.manufactureBy = manufactureBy; }

    public String getOperatingSystem() { return operatingSystem; }
    public void setOperatingSystem(String operatingSystem) { this.operatingSystem = operatingSystem; }

    public String getProcessor() { return processor; }
    public void setProcessor(String processor) { this.processor = processor; }

    public String getRam() { return ram; }
    public void setRam(String ram) { this.ram = ram; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    public String getSerialNo() { return serialNo; }
    public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}
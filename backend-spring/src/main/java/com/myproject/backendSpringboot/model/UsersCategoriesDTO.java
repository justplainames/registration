package com.myproject.backendSpringboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

public class UsersCategoriesDTO {
    int id;
    String userIdFk;
    int category_id_fk;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    float total_score;
    int event_id_fk;
    int order;
    String stage_name;
    int event_id;
    String category_name;

    public UsersCategoriesDTO(){
    }

    public UsersCategoriesDTO(int id, String userIdFk, int category_id_fk, LocalDateTime createdAt, LocalDateTime updatedAt, float total_score, int event_id_fk, int order, String stage_name, int event_id, String category_name) {
        this.id = id;
        this.userIdFk = userIdFk;
        this.category_id_fk = category_id_fk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.total_score = total_score;
        this.event_id_fk = event_id_fk;
        this.order = order;
        this.stage_name = stage_name;
        this.event_id = event_id;
        this.category_name = category_name;
    }

    public int getId() {
        return id;
    }

    public String getUserIdFk() {
        return userIdFk;
    }

    public int getCategory_id_fk() {
        return category_id_fk;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public float getTotal_score() {
        return total_score;
    }

    public int getEvent_id_fk() {
        return event_id_fk;
    }

    public int getOrder() {
        return order;
    }

    public String getStage_name() {
        return stage_name;
    }

    public int getEvent_id() {
        return event_id;
    }

    public String getCategory_name() {
        return category_name;
    }
}

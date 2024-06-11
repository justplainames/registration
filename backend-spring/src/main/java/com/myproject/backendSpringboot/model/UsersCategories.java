package com.myproject.backendSpringboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"UsersCategories\"")
public class UsersCategories {

    @Id
    @Column(name = "id")
    int id;
    @Column(name = "\"user_id_fk\"")
    String userIdFk;
    @Column(name = "category_id_fk")
    int category_id_fk;
    @Column(name = "\"createdAt\"")
    LocalDateTime createdAt;
    @Column(name = "\"updatedAt\"")
    LocalDateTime updatedAt;
    @Column(name = "total_score")
    float total_score;
    @Column(name = "event_id_fk")
    int event_id_fk;
    @Column(name = "order")
    int order;
    @Column(name = "stage_name")
    String stage_name;

    public UsersCategories(){

    }

    public UsersCategories(int id, String user_id_fk, int category_id_fk, LocalDateTime createdAt, LocalDateTime updatedAt, float total_score, int event_id_fk, int order, String stage_name) {
        this.id = id;
        this.userIdFk = user_id_fk;
        this.category_id_fk = category_id_fk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.total_score = total_score;
        this.event_id_fk = event_id_fk;
        this.order = order;
        this.stage_name = stage_name;
    }
    public int getId(){
        return id;
    }
    public String getUser_id_fk() {
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
}


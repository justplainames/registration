package com.myproject.backendSpringboot.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"Categories\"")
public class Categories {

    @Id
    @Column(name = "category_id_pk")
    int category_id_pk;
    @Column(name = "\"createdAt\"")
    LocalDateTime createdAt;
    @Column(name = "\"updatedAt\"")
    LocalDateTime updatedAt;
    @Column(name = "category_name")
    String category_name;


    public Categories(){

    }

    public Categories(int category_id_pk, LocalDateTime  createdAt, LocalDateTime updatedAt, String category_name) {
        this.category_id_pk = category_id_pk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.category_name = category_name;
    }

    public int getCategory_id_pk() {
        return category_id_pk;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getCategory_name() {
        return category_name;
    }
}

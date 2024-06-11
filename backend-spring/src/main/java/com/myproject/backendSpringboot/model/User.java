package com.myproject.backendSpringboot.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"Users\"")
public class User {

    @Id
    @Column(name = "user_id_pk")
    String user_id_pk;
    @Column(name = "\"createdAt\"")
    LocalDateTime createdAt;
    @Column(name = "\"updatedAt\"")
    LocalDateTime updatedAt;
    @Column(name = "user_name")
    String user_name;
    @Column(name = "user_email")
    String user_email;
    @Column(name = "user_instagram")
    String user_instagram;
    @Column(name = "user_role")
    String user_role;
    @Column(name = "user_phone_number")
    String user_phone_number;
    @Column(name = "user_stage_name")
    String user_stage_name;

    public User(){

    }

    public User(String user_id_pk, LocalDateTime createdAt, LocalDateTime updatedAt, String user_name, String user_email, String user_instagram, String user_role, String user_phone_number, String user_stage_name) {
        this.user_id_pk = user_id_pk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_instagram = user_instagram;
        this.user_role = user_role;
        this.user_phone_number = user_phone_number;
        this.user_stage_name = user_stage_name;
    }

    public String getName(){
        return this.user_name;
    }

    public String getUser_id_pk() {
        return user_id_pk;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getUser_email() {
        return user_email;
    }

    public String getUser_instagram() {
        return user_instagram;
    }

    public String getUser_role() {
        return user_role;
    }

    public String getUser_phone_number() {
        return user_phone_number;
    }

    public String getUser_stage_name() {
        return user_stage_name;
    }

    public void setUser_id_pk(String user_id_pk) {
        this.user_id_pk = user_id_pk;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public void setUser_instagram(String user_instagram) {
        this.user_instagram = user_instagram;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }

    public void setUser_phone_number(String user_phone_number) {
        this.user_phone_number = user_phone_number;
    }

    public void setUser_stage_name(String user_stage_name) {
        this.user_stage_name = user_stage_name;
    }
}

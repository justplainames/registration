package com.myproject.backendSpringboot.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"Events\"")
public class Events {

    @Id
    @Column(name = "event_id_pk")
    int event_id_pk;
    @Column(name = "\"createdAt\"")
    LocalDateTime createdAt;
    @Column(name = "\"updatedAt\"")
    LocalDateTime updatedAt;
    @Column(name = "event_date")
    LocalDateTime event_date;
    @Column(name = "event_name")
    String event_name;
    @Column(name = "event_description", columnDefinition = "TEXT")
    String event_description;
    @Column(name = "event_status")
    String event_status;
    @Column(name = "event_location")
    String event_location;


    public Events(){

    }

    public Events(int event_id_pk, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime event_date, String event_name, String event_description, String event_status, String event_location) {
        this.event_id_pk = event_id_pk;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.event_date = event_date;
        this.event_name = event_name;
        this.event_description = event_description;
        this.event_status = event_status;
        this.event_location = event_location;
    }


    public int getEvent_id_pk() {
        return event_id_pk;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getEvent_date() {
        return event_date;
    }

    public String getEvent_name() {
        return event_name;
    }

    public String getEvent_description() {
        return event_description;
    }

    public String getEvent_status() {
        return event_status;
    }

    public String getEvent_location() {
        return event_location;
    }
}

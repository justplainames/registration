package com.myproject.backendSpringboot.repository;
import com.myproject.backendSpringboot.model.Events;
import com.myproject.backendSpringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventsRepository extends JpaRepository<Events, Integer> {

}

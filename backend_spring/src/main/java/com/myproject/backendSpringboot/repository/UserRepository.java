package com.myproject.backendSpringboot.repository;
import com.myproject.backendSpringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, String> {

}

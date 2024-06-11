package com.myproject.backendSpringboot.repository;

import com.myproject.backendSpringboot.model.UsersCategories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UsersCategoriesRepository extends JpaRepository<UsersCategories, String> {
    List<UsersCategories> findByUserIdFk(String user_id_fk);
}

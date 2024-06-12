package com.myproject.backendSpringboot.repository;

import com.myproject.backendSpringboot.model.Categories;
import com.myproject.backendSpringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

}

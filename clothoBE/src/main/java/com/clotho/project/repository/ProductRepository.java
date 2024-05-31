package com.clotho.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clotho.project.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findByListby(String listby);
    List<Product> findByPsize(String psize);
    List<Product> findByPname(String pname);
    List<Product> findByListedTrue();
}

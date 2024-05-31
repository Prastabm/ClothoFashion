package com.clotho.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clotho.project.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmailAndPassword(String email, String password);
	List<User> findByRole(String role);
	User findByEmail(String email);
}

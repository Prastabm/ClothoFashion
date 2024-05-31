package com.clotho.project.controller;


import com.clotho.project.DTO.LoginDTO;
import com.clotho.project.DTO.UserUpdateDTO;
import com.clotho.project.Service.UserServiceImp;
import com.clotho.project.entity.User;
import com.clotho.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserServiceImp service;

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return service.findUsersByRole(role);
    }
    
    @GetMapping("/email/{email}")
    public User getUsersByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userRepository.findById(id)
            .orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<User> Login(@RequestBody LoginDTO data ) {
        User user = service.findByEmailAndPassword(data.getEmail(), data.getPassword());
  
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // Create a new user
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    
    @PutMapping("/agents/promote/{id}")
    public ResponseEntity<User> promoteAgent(@PathVariable int id){
    	User existingUser = userRepository.findById(id)
                .orElse(null);
    	if (existingUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    	existingUser.setRole("admin");
    	service.updateUser(id, existingUser);
    	return new ResponseEntity<>(existingUser, HttpStatus.OK);
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody UserUpdateDTO updatedUser) {
        User existingUser = userRepository.findById(id)
            .orElse(null);
        if (existingUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//        existingUser.setName(updatedUser.getName());
//        existingUser.setRole(updatedUser.getRole());
//        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setUsername(updatedUser.getUsername());
//        existingUser.setPassword(updatedUser.getPassword());
//        existingUser.setImg(updatedUser.getImg());
//        existingUser.setAddress(updatedUser.getAddress());
        existingUser = copyDtoToUser(updatedUser,existingUser);
        service.updateUser(id, existingUser);
        return new ResponseEntity<>(existingUser, HttpStatus.OK);
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        User existingUser = userRepository.findById(id)
            .orElse(null);
        if (existingUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userRepository.delete(existingUser);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    public static <T> User copyDtoToUser(T dto, User user) {
        Class<?> dtoClass = dto.getClass();
        Class<?> userClass = User.class;

        Field[] dtoFields = dtoClass.getDeclaredFields();
        Field[] userFields = userClass.getDeclaredFields();

        for (Field dtoField : dtoFields) {
            try {
                Field userField = getProductFieldByName(dtoField.getName(), userFields);
                if (userField != null && userField.getType().equals(dtoField.getType())) {
                    dtoField.setAccessible(true);
                    Object value = dtoField.get(dto);
                    if (value != null) {
                        userField.setAccessible(true);
                        userField.set(user, value);
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return user;
    }

    private static Field getProductFieldByName(String fieldName, Field[] userFields) {
        for (Field productField : userFields) {
            if (productField.getName().equals(fieldName)) {
                return productField;
            }
        }
        return null;
    }
}

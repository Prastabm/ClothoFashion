package com.clotho.project.Service;
import com.clotho.project.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUsers();

    Optional<User> getUserById(int id);
    
    User findByEmailAndPassword(String email, String password);
    List<User> findUsersByRole(String role);
    
    User createUser(User user);

    Optional<User> updateUser(int id, User updatedUser);

    boolean deleteUser(int id);
}
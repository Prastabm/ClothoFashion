package com.clotho.project.Service;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.clotho.project.entity.User;
import com.clotho.project.repository.UserRepository;

import jakarta.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
	
	private final EntityManager entityManager;
	
	
    public UserServiceImp(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
    @Override
    public User findByEmailAndPassword(String email, String password) {
       
    	Session currentSession = entityManager.unwrap(Session.class);
        Query<User> query = currentSession.createQuery("FROM User WHERE email = :email AND password = :password", User.class);
        query.setParameter("email", email);
        query.setParameter("password", password);
        return query.uniqueResult();
    }
    
    @Override
    public List<User> findUsersByRole(String role) {
        return userRepository.findByRole(role);
    } 
    
    @Override
    public Optional<User> updateUser(int id, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
//            existingUser.setName(updatedUser.getName());
//            existingUser.setRole(updatedUser.getRole());
//            existingUser.setEmail(updatedUser.getEmail());
//            existingUser.setUsername(updatedUser.getUsername());
//            existingUser.setPassword(updatedUser.getPassword());
//            existingUser.setImg(updatedUser.getImg());
//            existingUser.setAddress(updatedUser.getAddress());
            existingUser = copyDtoToUser(updatedUser,existingUser);
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public boolean deleteUser(int id) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            userRepository.delete(existingUserOptional.get());
            return true;
        } else {
            return false;
        }
        
    }
    private static <T> User copyDtoToUser(T dto, User user) {
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
package com.clotho.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="Message")
public class MessageItem {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@Column
	private String name;
	
	@Column
	private String location;
	
	@Column
	private String email;
	
	@Column
	private String message;
	
	@Column
	private boolean replied;
	
	@Column(nullable = true) 
	private String repliedby;
	
	@Column
	private String type;
	
	public MessageItem() {
		//Default Constructor for JPA
	}
	
	public MessageItem(String name, String location, String email, String message, boolean replied, String repliedby, String type) {
        this.name = name;
        this.location = location;
        this.email = email;
        this.message = message;
        this.replied = replied;
        this.repliedby = repliedby;
        this.type = type;
    }
	
	// Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isReplied() {
        return replied;
    }

    public void setReplied(boolean replied) {
        this.replied = replied;
    }

    public String getRepliedby() {
        return repliedby;
    }

    public void setRepliedby(String repliedby) {
        this.repliedby = repliedby;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

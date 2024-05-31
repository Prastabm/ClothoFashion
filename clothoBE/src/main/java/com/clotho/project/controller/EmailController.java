package com.clotho.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clotho.project.DTO.ReplyDTO;
import com.clotho.project.Service.EmailService;
import com.clotho.project.entity.MessageItem;
import com.clotho.project.repository.MessageRepository;

@RestController
@RequestMapping("/api/contactus")
@CrossOrigin
public class EmailController {
	
	@Autowired
	private final EmailService emailService;
	
	@Autowired
	private MessageRepository messageRepository;
	
	public EmailController(EmailService emailService) {this.emailService = emailService;}
	
    @GetMapping("/location/{location}")
    public ResponseEntity<List<MessageItem>> getMessagesByLocation(@PathVariable String location) {
        List<MessageItem> messages = emailService.findByLocation(location);
        return ResponseEntity.ok(messages);
    }

    // Messages replied = false
    @GetMapping("/replied/false")
    public ResponseEntity<List<MessageItem>> getUnrepliedMessages() {
        List<MessageItem> messages = emailService.findByReplied(false);
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/{id}")
    public Optional<MessageItem> getMessageById(@PathVariable int id){
    	return messageRepository.findById(id);
    }

    // Messages replied = true
    @GetMapping("/replied/true")
    public ResponseEntity<List<MessageItem>> getRepliedMessages() {
        List<MessageItem> messages = emailService.findByReplied(true);
        return ResponseEntity.ok(messages);
    }

    // Get all messages
    @GetMapping
    public ResponseEntity<List<MessageItem>> getAllMessages() {
        List<MessageItem> messages = emailService.findAll();
        return ResponseEntity.ok(messages);
    }

    // Get messages where replied = false and location = ?
    @GetMapping("/location/{location}/replied/false")
    public ResponseEntity<List<MessageItem>> getUnrepliedMessagesByLocation(@PathVariable String location) {
        List<MessageItem> messages = emailService.findByRepliedAndLocation(false, location);
        return ResponseEntity.ok(messages);
    }

    // Get messages where replied = true and location = ?
    @GetMapping("/location/{location}/replied/true")
    public ResponseEntity<List<MessageItem>> getRepliedMessagesByLocation(@PathVariable String location) {
        List<MessageItem> messages = emailService.findByRepliedAndLocation(true, location);
        return ResponseEntity.ok(messages);
    }
    
    @PostMapping("/message")
    public ResponseEntity<MessageItem> register(@RequestBody MessageItem message) {
        MessageItem savedMessage = messageRepository.save(message);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }

    //edit this based on  panel requirements
	@PostMapping("/send-reply/{id}")
	public String sendEmailTest( @PathVariable int id, @RequestBody ReplyDTO data) {
		MessageItem message = messageRepository.findById(id).orElse(null);
		message.setReplied(true);
		message.setRepliedby("clothohq@gmail.com");
		messageRepository.save(message);
		emailService.sendEmail(data.getTo(),data.getSubject(),data.getBody());
		return "Email Test sent successfully";
	}
	
	@PostMapping("/send-otp")
	public String sendOTP( @RequestBody ReplyDTO data) {
		try {
			emailService.sendEmail(data.getTo(),data.getSubject(),data.getBody());
			return "OTP sent successfully";
		}catch(Error e) {
			return e.getMessage();
		}
		
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteMessage(@PathVariable int id){
		try {
			messageRepository.deleteById(id);
			return "deleted";
		}catch(Error e) {
			return "something went wrong";
		}
		
	}
}

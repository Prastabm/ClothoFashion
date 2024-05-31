package com.clotho.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.clotho.project.entity.MessageItem;
import com.clotho.project.repository.MessageRepository;

@Service
public class EmailServiceImp implements EmailService{
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private MessageRepository messageRepository;
	
	public EmailServiceImp(JavaMailSender mailSender) { this.mailSender = mailSender; }	    
	
	@Override
    public List<MessageItem> findAll() {
        return messageRepository.findAll();
    }

    @Override
    public Optional<MessageItem> findById(int id) {
        return messageRepository.findById(id);
    }

    @Override
    public MessageItem save(MessageItem messageItem) {
        return messageRepository.save(messageItem);
    }
    
    @Override
    public void deleteById(int id) {
        messageRepository.deleteById(id);
    }

    @Override
    public List<MessageItem> findByName(String name) {
        return messageRepository.findByName(name);
    }

    @Override
    public List<MessageItem> findByReplied(boolean replied) {
        return messageRepository.findByReplied(replied);
    }

    @Override
    public long countByReplied(boolean replied) {
        return messageRepository.countByReplied(replied);
    }

    @Override
    public List<MessageItem> findByLocation(String location) {
        return messageRepository.findByLocation(location);
    }

    @Override
    public List<MessageItem> findByRepliedAndLocation(boolean replied, String location) {
        return messageRepository.findByRepliedAndLocation(replied, location);
    }
	
	public void sendEmail(String to, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("clothohq@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
		mailSender.send(message);
	}
}

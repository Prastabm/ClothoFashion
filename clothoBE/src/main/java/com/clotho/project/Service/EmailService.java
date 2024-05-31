package com.clotho.project.Service;

import java.util.List;
import java.util.Optional;

import com.clotho.project.entity.MessageItem;

public interface EmailService {
	List<MessageItem> findAll();

    Optional<MessageItem> findById(int id);

    void deleteById(int id);

    List<MessageItem> findByName(String name);
    
    MessageItem save(MessageItem messageItem);

    List<MessageItem> findByReplied(boolean replied);

    long countByReplied(boolean replied);

    List<MessageItem> findByLocation(String location);

    List<MessageItem> findByRepliedAndLocation(boolean replied, String location);

	void sendEmail(String string, String string2, String string3);
}

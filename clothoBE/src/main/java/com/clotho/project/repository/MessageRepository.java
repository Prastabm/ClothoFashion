package com.clotho.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.clotho.project.entity.MessageItem;

public interface MessageRepository extends JpaRepository<MessageItem, Integer> {
	 // Find by a single field
    List<MessageItem> findByName(String name);

    // Find by multiple fields
    List<MessageItem> findByNameAndLocation(String name, String location);

    // Find by boolean field
    List<MessageItem> findByReplied(boolean replied);

    // Find by email containing a substring
    List<MessageItem> findByEmailContaining(String emailSubstring);

    // Find by message with custom query
    @Query("SELECT m FROM MessageItem m WHERE m.message LIKE %:keyword%")
    List<MessageItem> findByMessageContaining(@Param("keyword") String keyword);

    // Count by replied status
    long countByReplied(boolean replied);

    // Delete by name
    void deleteByName(String name);

	List<MessageItem> findByLocation(String location);

	List<MessageItem> findByRepliedAndLocation(boolean replied, String location);

}

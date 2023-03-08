package com.ideas2it.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ideas2it.todo.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT u FROM User u WHERE u.mailId = ?1 and u.password = ?2")
	User findUserByMailIdAndPassword(String userName, String password);

}

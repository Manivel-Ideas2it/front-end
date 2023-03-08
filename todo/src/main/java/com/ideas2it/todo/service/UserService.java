package com.ideas2it.todo.service;

import org.springframework.http.ResponseEntity;

import com.ideas2it.todo.dto.TaskDto;
import com.ideas2it.todo.dto.UserDto;

public interface UserService {

	ResponseEntity<UserDto> createuser(UserDto userDto);

	ResponseEntity<UserDto> checkUser(String userName, String password);

	UserDto updateTask(Integer id, TaskDto taskDto);

	UserDto readList(Integer id);

	void exitUser(Integer id);

	UserDto read();

}

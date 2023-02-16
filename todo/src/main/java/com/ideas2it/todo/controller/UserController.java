package com.ideas2it.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todo.dto.UserDto;
import com.ideas2it.todo.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
	
	@Autowired
	private UserService userservice;
	
	@PostMapping
	public void createUser(@RequestBody UserDto userDto) {
		userservice.createuser(userDto);
	}

}

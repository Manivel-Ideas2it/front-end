package com.ideas2it.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todo.dto.TaskDto;
import com.ideas2it.todo.dto.UserDto;
import com.ideas2it.todo.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins =  "http://127.0.0.1:5500")
public class UserController {
	
	@Autowired
	private UserService userservice;
	
	@PostMapping
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
		retiurn userservice.createuser(userDto);
	}
	
	@GetMapping("/check")
	public ResponseEntity<UserDto> checkUser(@RequestParam("userName") String userName,@RequestParam("password") String password ) {
		return userservice.checkUser(userName,password);
	}
	
	@GetMapping()
	public UserDto read() {
		return userservice.read();
	}
	
	@GetMapping("/")
	public UserDto readList(@RequestParam("id") Integer id) {
		return userservice.readList(id);
	}
	
	@PatchMapping
	public UserDto updateTask(@RequestParam("id") Integer id, @RequestBody TaskDto taskDto) {
		return userservice.updateTask(id,taskDto);
	}
	
	@PutMapping
	public void exitUser(@RequestParam("id") Integer id) {
		userservice.exitUser(id);
	}

}

package com.ideas2it.todo.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ideas2it.todo.dto.TaskDto;
import com.ideas2it.todo.dto.UserDto;
import com.ideas2it.todo.model.Task;
import com.ideas2it.todo.model.User;
import com.ideas2it.todo.repository.UserRepository;
import com.ideas2it.todo.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMap;

	@Override
	public ResponseEntity<UserDto> createuser(UserDto userDto) {
		User user = modelMap.map(userDto, User.class);
		userRepository.save(user);
		return new ResponseEntity<>(userDto,HttpStatus.OK);
	}

	@Override
	public ResponseEntity<UserDto> checkUser(String userName, String password) {
		User user = userRepository.findUserByMailIdAndPassword(userName, password);
		if (user != null) {
			user.setActive(true);
			UserDto userDto = modelMap.map(user, UserDto.class);
			userRepository.save(user);
			return new ResponseEntity<>(userDto,HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null,HttpStatus.BAD_GATEWAY);
		}
	}


	@Override
	public UserDto updateTask(Integer id, TaskDto taskDto) {
		List<Task> task = new ArrayList<>();
		User user =  userRepository.findById(id).get();
		user.getTask().forEach(t -> task.add(t));
		task.add(modelMap.map(taskDto,Task.class));
		user.setTask(task);
		 userRepository.save(user);
		UserDto userDto = modelMap.map(user, UserDto.class);
		List<TaskDto> taskDto1 = user.getTask().stream().map(t -> modelMap.map(t, TaskDto.class)).toList();
		userDto.setTaskDto(taskDto1);
		return userDto;	
	}

	@Override
	public UserDto readList(Integer id) {
		User user =  userRepository.findById(id).get();
		UserDto userDto = modelMap.map(user,UserDto.class);
		List<TaskDto> taskDto = user.getTask().stream().map(t -> modelMap.map(t,TaskDto.class)).toList();
		userDto.setTaskDto(taskDto);
		return userDto;
	}

	@Override
	public void exitUser(Integer id) {
		User user = userRepository.findById(id).get();
		user.setActive(false);
		userRepository.save(user);
	}

	@Override
	public UserDto read() {
		User user = null;
		List<User> userList = userRepository.findAll();
		System.out.print(userList);
		for(User e : userList) {
			user = e.isActive() ? e : null;
		}
		UserDto userDto = modelMap.map(user,UserDto.class);
		return userDto;
	} 
}

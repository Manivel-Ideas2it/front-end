package com.ideas2it.todo.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
	public void createuser(UserDto userDto) {
		User user = modelMap.map(userDto, User.class);
		List<Task> task = userDto.getTaskDto().stream().map(taskDto -> modelMap.map(taskDto, Task.class)).toList();
		user.setTask(task);
		userRepository.save(user);
		System.out.print(user.getTask());
	}

	@Override
	public UserDto checkUser(String userName, String password) {
		User user = userRepository.findUserByMailIdAndPassword(userName, password);
		if (user != null) {
			UserDto userDto = modelMap.map(user, UserDto.class);
			return userDto;
		} else {
			return null;
		}
	}


	@Override
	public UserDto updateTask(Integer id, TaskDto taskDto) {
		List<Task> task = new ArrayList<>();
		User user = userRepository.findById(id).get();
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
		User user = userRepository.findById(id).get();
		UserDto userDto = modelMap.map(user,UserDto.class);
		List<TaskDto> taskDto = user.getTask().stream().map(t -> modelMap.map(t,TaskDto.class)).toList();
		userDto.setTaskDto(taskDto);
		return userDto;
	}

}

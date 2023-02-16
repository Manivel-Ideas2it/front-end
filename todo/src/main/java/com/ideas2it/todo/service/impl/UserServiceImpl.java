package com.ideas2it.todo.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.todo.dto.UserDto;
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
//		userDto.getTaskDto().stream().map(task -> modelMap.map(u, null))
		userRepository.save(user);
	}

}

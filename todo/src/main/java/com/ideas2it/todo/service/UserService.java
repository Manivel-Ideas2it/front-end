package com.ideas2it.todo.service;

import com.ideas2it.todo.dto.TaskDto;
import com.ideas2it.todo.dto.UserDto;

public interface UserService {

	void createuser(UserDto userDto);

	UserDto checkUser(String userName, String password);

	UserDto updateTask(Integer id, TaskDto taskDto);

	UserDto readList(Integer id);

}

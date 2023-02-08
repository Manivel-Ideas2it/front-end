package com.ideas2it.todo.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.todo.dto.TaskDto;
import com.ideas2it.todo.model.Task;
import com.ideas2it.todo.repository.TodoRepository;
import com.ideas2it.todo.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService{
	
	@Autowired
	private TodoRepository todoRepo;
	
	@Autowired
	private ModelMapper modelmap;

	@Override
	public void addTask(TaskDto taskDto) {
		Task task = modelmap.map(taskDto, Task.class);
		todoRepo.save(task);		
	}

	@Override
	public List<TaskDto> readTask() {
		List<Task> task = todoRepo.findAll();
		List<TaskDto> taskDto = task.stream().map(taskname -> modelmap.map(task,TaskDto.class)).toList();
		return taskDto;
	}
	
	

}

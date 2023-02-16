package com.ideas2it.todo.service.impl;

import java.util.ArrayList;
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
		List<TaskDto> taskDto = task.stream().map(t -> modelmap.map(t, TaskDto.class)).toList(); 
		return taskDto;
	}

	@Override
	public void deleteTask(TaskDto taskDto) {
		todoRepo.deleteById(taskDto.getId());
	}

	@Override
	public void updateTask(TaskDto taskDto) {
		Task task = modelmap.map(taskDto, Task.class);
		todoRepo.save(task);
	}

	
	public List<TaskDto> searchTask(String taskname){
		if(taskname != "") {
			List<Task> task = todoRepo.findByTaskContains(taskname);
			List<TaskDto> taskDto = task.stream().map(t -> modelmap.map(t, TaskDto.class)).toList(); 
			return taskDto;	
		} else {
			return new ArrayList<>();
		}
	}

}

/**
 * 
 */
package com.ideas2it.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todo.dto.TaskDto;
import com.ideas2it.todo.service.TodoService;

/**
 * @author LENOVO
 *
 */
@RestController
@RequestMapping("/api/v1/todo")
@CrossOrigin(origins =  "http://127.0.0.1:5500")
public class todoController {
	
	@Autowired
	private TodoService todoService;
	
	@PostMapping("/add")
	public void addTask(@RequestBody TaskDto taskDto) {
	todoService.addTask(taskDto);
	}
	
	@GetMapping
	public List<TaskDto> readtask() {
		return todoService.readTask();
	}

}

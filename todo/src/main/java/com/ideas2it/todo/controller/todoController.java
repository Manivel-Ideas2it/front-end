/**
 * 
 */
package com.ideas2it.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todo.service.TodoService;

/**
 * @author LENOVO
 *
 */
@RestController
@RequestMapping("/api/v1/todo")
public class todoController {
	
	@Autowired
	private TodoService todoService;

}

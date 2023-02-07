package com.ideas2it.todo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.todo.repository.TodoRepository;
import com.ideas2it.todo.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService{
	
	@Autowired
	private TodoRepository todoRepo;

}

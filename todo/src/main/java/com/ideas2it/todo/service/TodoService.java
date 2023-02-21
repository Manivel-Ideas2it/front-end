/**
 * 
 */
package com.ideas2it.todo.service;

import java.util.List;

import com.ideas2it.todo.dto.TaskDto;

/**
 * @author LENOVO
 *
 */
public interface TodoService {

	void addTask(TaskDto taskDto);

	void updateTask(TaskDto taskDto);
	
//	void completeTask(TaskDto taskDto);
	
	List<TaskDto> searchTask(String task);

	void deleteTask(Integer id);

}

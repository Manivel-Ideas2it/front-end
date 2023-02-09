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

	List<TaskDto> readTask();

	void deleteTask(TaskDto taskDto);

	void updateTask(TaskDto taskDto);
}

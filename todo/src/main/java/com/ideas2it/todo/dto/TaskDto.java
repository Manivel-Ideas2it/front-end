package com.ideas2it.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {
	private Integer id;
	private String task;
	private boolean isDelete;
	private boolean isComplete;
	private UserDto userDto;
}

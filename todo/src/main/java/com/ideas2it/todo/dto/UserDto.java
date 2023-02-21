package com.ideas2it.todo.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	private Integer id;
	private String name;
	private String mailId;
	private String password;
	private List<TaskDto> taskDto;
}

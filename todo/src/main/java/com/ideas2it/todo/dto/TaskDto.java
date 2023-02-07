package com.ideas2it.todo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {
	private Integer id;
	@NotNull
	private String task;
	private boolean isDelete;
	private boolean isComplete;
}

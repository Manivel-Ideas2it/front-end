package com.ideas2it.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ideas2it.todo.mapper.ModelMap;

/**
*
* @author manivel S
* @since 07-02-2023
* @version 1.0
*/
@SpringBootApplication
public class TodoApplication {
	
	@Bean
	public ModelMap modelMapper() {
		return new ModelMap();
	}

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

}

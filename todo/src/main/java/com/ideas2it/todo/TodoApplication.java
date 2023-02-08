package com.ideas2it.todo;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
*
* @author manivel S
* @since 07-02-2023
* @version 1.0
*/
@SpringBootApplication
public class TodoApplication {
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

}

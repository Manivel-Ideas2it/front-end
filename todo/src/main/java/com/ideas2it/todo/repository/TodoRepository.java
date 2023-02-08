package com.ideas2it.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideas2it.todo.model.Task;

@Repository
public interface TodoRepository extends JpaRepository<Task, Integer>{


}

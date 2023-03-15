package com.github.ricxi.backend.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/task")
public class TaskController {
    
    @Autowired
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping(path = "/{taskId}")
    public Task getTask(@PathVariable(name  = "taskId") Long taskId) throws TaskNotFoundException {
        return taskService.getTask(taskId);
    }

    @PutMapping
    public Task updateTask(@RequestBody Task taskData) throws TaskNotFoundException {
        return taskService.updateTask(taskData);
    }

    @DeleteMapping(path = "/{taskId}")
    public void deleteTask(@PathVariable(name = "taskId") Long taskId) throws TaskNotFoundException {
        taskService.deleteTask(taskId);
    }
}

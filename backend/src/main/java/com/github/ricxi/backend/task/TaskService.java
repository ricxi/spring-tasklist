package com.github.ricxi.backend.task;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {

    @Autowired
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTask(Long taskId) throws TaskNotFoundException {
        return taskRepository
                .findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("task with id " + taskId + " not found"));
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) throws TaskNotFoundException {
        if(!taskRepository.existsById(taskId)) {
            throw new TaskNotFoundException("invalid id: cannot delete task");
        }


        taskRepository.deleteById(taskId);
    }

    @Transactional
    public Task updateTask(Task taskData) throws TaskNotFoundException {
        Task task = taskRepository
                        .findById(taskData.getId())
                        .orElseThrow(() -> new TaskNotFoundException("task with id " + taskData.getId() + " not found"));
    
        String subject = taskData.getSubject();
        String details = taskData.getDetails();
        Boolean complete = taskData.getComplete();

        if (Objects.nonNull(subject) 
            && !"".equalsIgnoreCase(subject)
            && !Objects.equals(task.getSubject(), subject)    
            ) {
                task.setSubject(subject);
        }

        if (Objects.nonNull(details) 
            && !"".equalsIgnoreCase(details)
            && !Objects.equals(task.getDetails(), details)    
            ) {
                task.setDetails(details);
        }
        
        // ! This field is set to false when the "complete" field isn't provided in the JSON body
        // ! I think this is related to the default field I set in the Task entity
        if (Objects.nonNull(complete) 
            && !Objects.equals(task.getComplete(), complete)
            ) {
                task.setComplete(complete);
        }

        return task;   
    }
}

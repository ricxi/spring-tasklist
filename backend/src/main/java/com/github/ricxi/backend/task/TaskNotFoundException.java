package com.github.ricxi.backend.task;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TaskNotFoundException extends Exception {
    
    public TaskNotFoundException() {
        super();
    }
  
    public TaskNotFoundException(String message) {
        super(message);
    }
  
    public TaskNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
  
    public TaskNotFoundException(Throwable cause) {
        super(cause);
    }
  
    public TaskNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
    
}

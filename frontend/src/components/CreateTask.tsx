import React, { useContext, useState } from 'react';
import {
  ITaskListContextProps,
  TaskListContext,
} from '../contexts/TaskListContext';
import { ITask } from '../types/ITask';
import Card from './ui/Card';

function CreateTask() {
  const { createTask } = useContext(TaskListContext) as ITaskListContextProps;

  const [subject, setSubject] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // add validation
    const newTask: Omit<ITask, 'id'> = {
      subject: subject,
      details: details,
      complete: false,
    };

    createTask(newTask);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className='create-task-form'>
        <h2>Create a New Task</h2>
        <input
          className='create-task-input'
          type='text'
          placeholder='task name'
          value={subject}
          onChange={({ target }) => setSubject(target.value)}
        />
        <input
          className='create-task-input'
          type='text'
          placeholder='details'
          value={details}
          onChange={({ target }) => setDetails(target.value)}
        />
        <button type='submit' className='submit-button'>
          submit
        </button>
      </form>
    </Card>
  );
}

export default CreateTask;

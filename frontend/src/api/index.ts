import { ITask } from '../types/ITask';
import { ErrorResponse } from './responseWrappers';

const END_POINT = 'http://127.0.0.1:8081/api/v1/task';

export const getAllTasks = async (): Promise<ITask[]> => {
  const res = await fetch(END_POINT);
  return await res.json();
};

// This should also return an error object or something, like the
// promise generic should include 2 things Promise<ITask|ErrorResponse>
export const createNewTask = async (
  newTask: Omit<ITask, 'id'>
): Promise<ITask | ErrorResponse> => {
  const res = await fetch(END_POINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  // How do I throw and catch errors in React again?
  // What do I do again?
  // Send a different json to the TaskListContext so it can decide what to do
  if (res.status !== 201) {
    console.error('ERROR: task may not have been added');
    return (await res.json()) as ErrorResponse;
  }

  return await res.json();
};

// ! fix this later to use the error response instead of a boolean
export const deleteTaskById = async (taskId: number): Promise<boolean> => {
  const res = await fetch(`${END_POINT}/${taskId}`, {
    method: 'DELETE',
  });
  if (res.status !== 200) return false;

  return true;
};

import { createContext, useEffect, useState } from 'react';
import { createNewTask, deleteTaskById, getAllTasks } from '../api';
import { ITask } from '../types/ITask';

export interface ITaskListContextProps {
  tasks: ITask[];
  deleteTask: (id: number) => void;
  createTask: (newTask: Omit<ITask, 'id'>) => void;
}

interface ITaskListProviderProps {
  children: React.ReactNode;
}

// Why did I pass null here?
export const TaskListContext = createContext<null | ITaskListContextProps>(
  null
);

export const TaskListProvider = ({ children }: ITaskListProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([] as ITask[]);

  useEffect(() => {
    getAllTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  // I need to account for error responses
  const deleteTask = async (taskId: number) => {
    const deleteSuccessful = await deleteTaskById(taskId);
    if (deleteSuccessful)
      setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== taskId));
  };

  // createTask should return an error if the subject field is empty
  const createTask = async (newTask: Omit<ITask, 'id'>) => {
    // ! this is a mess because:
    // I need to account for the ErrorResponse type, which I currently do not
    // maybe google typescript interface type guards
    const createdTask = (await createNewTask(newTask)) as ITask;
    setTasks([createdTask, ...tasks]);
  };

  return (
    <TaskListContext.Provider value={{ tasks, deleteTask, createTask }}>
      {children}
    </TaskListContext.Provider>
  );
};

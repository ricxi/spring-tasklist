import { useContext } from 'react';
import {
  ITaskListContextProps,
  TaskListContext,
} from '../contexts/TaskListContext';
import Task from './Task';

function TaskList() {
  const { tasks, deleteTask } = useContext(
    TaskListContext
  ) as ITaskListContextProps;

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;

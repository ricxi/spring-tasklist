import { useContext } from 'react';
import {
  ITaskListContextProps,
  TaskListContext,
} from '../contexts/TaskListContext';
import { ITask } from '../types/ITask';
import Card from './ui/Card';

type TaskProps = {
  task: ITask;
};

function Task({ task }: TaskProps) {
  // complete will be used for something eventually
  const { id, subject, details, complete } = task;

  const { deleteTask } = useContext(TaskListContext) as ITaskListContextProps;

  // should I move this handler out to the context?
  const handleDelete = (id: number) => () => deleteTask(id);

  return (
    <Card>
      <h2>{subject}</h2>
      <p>{details}</p>
      <button className='del-btn' onClick={handleDelete(id)}>
        x
      </button>
    </Card>
  );
}

export default Task;

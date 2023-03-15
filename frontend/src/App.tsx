import Header from './components/Header';
import SpreadSheetGenerator from './components/SpreadSheetGenerator';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import { TaskListProvider } from './contexts/TaskListContext';

function App() {
  return (
    <TaskListProvider>
      <Header />
      <main className='container'>
        {/* <SpreadSheetGenerator /> */}
        <CreateTask />
        <TaskList />
      </main>
    </TaskListProvider>
  );
}

export default App;

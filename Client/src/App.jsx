import { useState } from 'react';

import Timer from './components/timer/Timer';
import Task from './components/task/Task';
import CreateTask from './components/create-task/CreateTask';
import Button from './components/button/Button';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-100 h-screen w-full flex flex-col p-4 md{:p-0  justify-between gap-4 items-center">
      {open ? <CreateTask setOpen={setOpen} /> : <Task />}
      <div className="w-full flex flex-col gap-2">
        <Button setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { TrashIcon, ClockIcon, CheckIcon } from '@heroicons/react/outline';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3030/tasks').then((res) => setTasks(res.data));
  }, [rerender]);

  console.log(tasks);

  const TaskCards = tasks.map((task) => {
    const deleteTask = () => {
      axios.delete(`http://localhost:3030/tasks/${task.id}`);
    };

    const markAsDone = () => {
      axios.patch(`http://localhost:3030/tasks/${task.id}`, { status: true });
    };
    return (
      <div
        className="grid grid-cols-oneThreeOne gap-2 bg-white rounded-lg p-2  shadow-sm "
        key={task.id}
      >
        <div>
          <img
            src={`http://localhost:3030/${task.image}`}
            alt=""
            className="w-24 h-16 object-cover text-sm rounded-lg"
          />
        </div>

        <div className="flex flex-col ml-4 justify-center gap-2 items-start">
          <h2>{task.title}</h2>
          <div className="flex gap-2 text-neutral-600">
            <span className="flex gap-2  justify-center items-center">
              <ClockIcon className="h-4 w-4 " />
              <p>{task.duration} mins</p>
            </span>
            <p
              className={`p-1 rounded-lg text-xs text-white
                ${task.importance === 'high' && `bg-red-600`}
                ${task.importance === 'normal && bg-green-500'}
                ${task.importance === 'low' && `bg-slate-400`}`}
            >
              {task.importance}
            </p>
          </div>
        </div>
        <div className="flex  justify-center items-center gap-2">
          <CheckIcon
            className="h-9 w-9 rounded-lg border-2 border-green-500 
          text-green-600 hover:bg-green-600 hover:text-white p-1 box-border active:bg-green-800 active:text-white active:translate-y-1"
            onClick={() => {
              markAsDone();
              setRerender(!rerender);
            }}
          />
          <TrashIcon
            className="h-9 w-9 rounded-lg border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white p-1 box-border active:bg-red-800 active:text-white active:translate-y-1"
            onClick={() => {
              deleteTask();
              setRerender(!rerender);
            }}
          />
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-2">
      {TaskCards.length > 0 ? (
        TaskCards
      ) : (
        <p className="text-2xl text-neutral-700">Good job, no tasks left 😄</p>
      )}
    </div>
  );
};

export default Task;

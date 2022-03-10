import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Timer from '../timer/Timer';
import { useRecoilValue, useRecoilState } from 'recoil';
import { user, tasks, accessToken } from '../../atoms';

import {
  TrashIcon,
  ClockIcon,
  CheckIcon,
  XIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline';
import axios from 'axios';

const Task = ({ setOpenTask, openTask }) => {
  const [tasksList, setTasksList] = useRecoilState(tasks);
  const userData = useRecoilValue(user);
  const accessTkn = useRecoilValue(accessToken);
  const [rerender, setRerender] = useState(false);
  console.log(userData.id);

  const params = useParams();

  console.log(params);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/tasks`, {
        headers: { authorization: accessTkn },
      })
      .then((res) => setTasksList(res.data));
  }, [rerender]);

  const TaskCards = tasksList.map((task, i) => {
    const deleteTask = () => {
      axios.delete(`http://localhost:3030/tasks/${task.id}`);
    };

    const markAsDone = () => {
      axios.patch(`http://localhost:3030/tasks/${task.id}`, { status: true });
    };
    return (
      <div
        className={` bg-[#F7F6F3] justify-between p-2 rounded-lg shadow-sm py-4
       
        ${
          openTask === i
            ? `flex flex-col items-center justify-center`
            : `grid grid-cols-oneThreeOne gap-4`
        }`}
        key={task.id}
        onClick={() => setOpenTask(i)}
      >
        <div>
          <img
            src={`http://localhost:3030/${task.image}`}
            alt=""
            className={` object-cover text-sm rounded-lg ${
              open === i ? 'w-full h-full  md:w-64 md:h-64' : 'w-16 h-16'
            }`}
          />
        </div>
        <div className={`flex flex-col justify-center gap-2 `}>
          <h2>{task.title}</h2>

          <span className="flex gap-1 items-center  text-xs text-[#736B5B]">
            <ClockIcon className="h-3 w-3" />
            <p>{task.duration} minutes</p>
            <p
              className={` ${
                task.importance === 'low' &&
                'bg-[#60B158] bg-opacity-30 px-2 py-1 p rounded-full font-bold text-[#60B158]'
              }
        ${
          task.importance === 'normal' &&
          'bg-[#FEBC2B] bg-opacity-30 px-2 py-1 rounded-full font-bold text-[#FEBC2B]'
        }
        ${
          task.importance === 'high' &&
          'bg-[#FC413B] bg-opacity-30 px-2 py-1 rounded-full font-bold text-[#FC413B]'
        }`}
            >
              {task.importance}
            </p>
          </span>
        </div>
        <div className="flex justify-end">
          <DotsVerticalIcon className="h-6 w-6 cursor-pointer" />
        </div>
        {openTask === i && <Timer time={task.duration} />}
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

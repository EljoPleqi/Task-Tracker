import React, { Fragment, useEffect, useState } from 'react';

import Timer from '../timer/Timer';
import { Menu, Transition } from '@headlessui/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tasks, accessToken } from '../../atoms';

import {
  TrashIcon,
  ClockIcon,
  CheckIcon,
  PencilAltIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline';
import axios from 'axios';

const Task = ({ setOpenTask, openTask }) => {
  const [tasksList, setTasksList] = useRecoilState(tasks);
  const accessTkn = useRecoilValue(accessToken);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/tasks`, {
        headers: { authorization: accessTkn },
      })
      .then((res) => setTasksList(res.data));
  }, [rerender, accessTkn, setTasksList]);

  const TaskCards = tasksList.map((task, i) => {
    const deleteTask = () => {
      axios.delete(`http://localhost:3030/tasks/${task.id}`);
      setRerender(!rerender);
    };

    const markAsDone = () => {
      axios.patch(`http://localhost:3030/tasks/${task.id}`, { status: true });
      setRerender(!rerender);
    };
    console.log(task);
    return (
      <div
        className={task.status && 'bg-blend-overlay bg-neutral-300 opacity-40 	'}
        key={task.id}
      >
        <div
          className={`bg-[#F7F6F3] hover:shadow-lg hover:border-2 border-[#FBFAF9] justify-between p-2 rounded-lg shadow-sm py-4 
     
      ${
        openTask === i
          ? `flex flex-col items-center justify-center`
          : `grid grid-cols-oneThreeOne gap-4`
      }`}
        >
          <div>
            <img
              src={`http://localhost:3030/${task.image}`}
              alt=""
              className={` object-cover text-sm rounded-lg ${
                openTask === i ? 'w-full h-full  md:w-64 md:h-64' : 'w-16 h-16'
              }`}
            />
          </div>
          <div
            className={`flex flex-col justify-center gap-2 cursor-pointer`}
            onClick={() => setOpenTask(i)}
          >
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
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
              <DotsVerticalIcon className="h-6 w-6 cursor-pointer hover:text-[#60B158] active:translate-y-1" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute bg-[#F7F6F3] text-xs right-0 w-56 mt-2 origin-top-right z-20 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item
                  as="div"
                  className="flex gap-2 cursor-pointer p-2  hover:bg-[#EDEAE3]  "
                  onClick={deleteTask}
                >
                  <PencilAltIcon className="h-4 w-4" /> <p>Edit Task</p>{' '}
                </Menu.Item>
                <Menu.Item
                  as="div"
                  className="flex gap-2 cursor-pointer p-2  hover:bg-[#60B158]"
                  onClick={markAsDone}
                >
                  <CheckIcon className="h-4 w-4" /> <p>Mark as done</p>{' '}
                </Menu.Item>
                <Menu.Item
                  as="div"
                  className="flex gap-2 cursor-pointer p-2 hover:bg-[#FC413B] "
                  onClick={deleteTask}
                >
                  <TrashIcon className="h-4 w-4" /> <p>Delete Task</p>{' '}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          {openTask === i && (
            <Timer
              time={task.duration}
              markAsDone={markAsDone}
              setOpenTask={setOpenTask}
            />
          )}
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

import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Task from '../task/Task';
import CreateTask from '../create-task/CreateTask';
import Button from '../button/Button';
import UserDetails from '../user/UserDetails';

import { XCircleIcon } from '@heroicons/react/outline';
import { loginState } from '../../atoms';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState();
  const loginStatus = useRecoilValue(loginState);

  return (
    <div>
      {loginStatus && (
        <div className="bg-[#E2DDD3] h-screen w-full flex flex-col p-4 justify-center items-center">
          <div className="flex flex-col gap-8 h-full">
            <UserDetails />
            <h1 className="text-center">What will you accomplish today?</h1>

            {open ? (
              <CreateTask setOpen={setOpen} />
            ) : (
              <Task openTask={openTask} setOpenTask={setOpenTask} />
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <Button setOpen={setOpen} open={open} />
            {Number.isInteger(openTask) && (
              <div
                className="flex justify-center gap-2 p-4 rounded-lg hover:border-2 bg-[#FC413B] 
          hover:border-red-50hover:text-white text-white box-border
           active:bg-red-800 active:text-white active:translate-y-1"
                onClick={() => {
                  setOpenTask(false);
                }}
              >
                <XCircleIcon className="h-6 w-6" />
                <p>Close all</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/outline';

const LoginScreen = () => {
  return (
    <div>
      <form className="flex flex-col items-center justify-center w-72 gap-8 py-44">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder={`username`}
            className={` bg-[#F7F6F3] justify-between p-4   rounded-lg shadow-sm/> text-center`}
          />
          <input
            type="password"
            placeholder={`password`}
            className={` bg-[#F7F6F3] justify-between p-4 rounded-lg shadow-sm/> text-center`}
          />
        </div>
        <button className="w-full flex gap-2 bg-[#263a44] text-white p-4 rounded-lg items-center justify-center">
          {' '}
          <LockClosedIcon className="h-6 w-6" /> Log in
        </button>
        <span>
          <a
            href="#"
            className="text-[#262219] rounded-lg cursor-pointer"
            onClick={() => setToggleSignUp(false)}
          >
            Don't have an account? Sign up
          </a>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;

import React from 'react';
import { UserIcon } from '@heroicons/react/outline';

const SignUp = ({ setToggleSignUp }) => {
  return (
    <div>
      <form className="flex flex-col items-center justify-center w-72 gap-8 py-44">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder={`username`}
            className={` bg-[#F7F6F3] justify-between p-4   rounded-lg shadow-sm/> text-center`}
            onChange={(e) => set(e.target.value)}
          />
          <input
            type="password"
            placeholder={`password`}
            className={` bg-[#F7F6F3] justify-between p-4 rounded-lg shadow-sm/> text-center`}
            onChange={(e) => set(e.target.value)}
          />
          <input
            type="password"
            placeholder={`password`}
            className={` bg-[#F7F6F3] justify-between p-4 rounded-lg shadow-sm/> text-center`}
            onChange={(e) => set(e.target.value)}
          />
        </div>
        <button className="w-full flex gap-2 bg-[#263a44] text-white p-4 rounded-lg items-center justify-center">
          {' '}
          <UserIcon className="h-6 w-6" /> Sign up
        </button>
        <span>
          <a
            href="#"
            className="text-[#262219] rounded-lg cursor-pointer"
            onClick={() => setToggleSignUp(true)}
          >
            Have an account? Log in
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignUp;

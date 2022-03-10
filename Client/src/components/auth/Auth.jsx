import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { SplashScreen } from '../illustrations/FirstSplashScreen';

import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/outline';

const Auth = () => {
  return (
    <div className="bg-[#E2DDD3] h-screen w-full flex flex-col p-4 justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        {SplashScreen}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Hi, I'm Tasks</h1>
          <p className="text-center">
            I hold 24 hours of tasks. That's it. No streaks, no numbers, no
            nonsense. Just a way to keep track of the small stuff in life – one
            day at a time.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Link
            to="/signup"
            className="w-full flex gap-2 bg-[#60B158] hover:bg-green-500 active:bg-green-800 active:translate-y-1 text-white p-4 rounded-lg items-center justify-center"
          >
            <UserCircleIcon className="h-6 w-6" /> Create Account
          </Link>
          <Link
            to="/login"
            className="w-full flex gap-2 bg-[#263a44] text-white p-4 rounded-lg items-center justify-center"
          >
            <LockClosedIcon className="h-6 w-6" /> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React, { useState, useEffect, useRef } from 'react';
import { PauseIcon } from '@heroicons/react/outline';

const Timer = ({ time }) => {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);

  const displayMinutes = Math.floor(seconds / 60);

  let displaySeconds = seconds % 60;
  if (displaySeconds < 10) displaySeconds = `0${displaySeconds}`;

  // assign references
  const secondsRef = useRef(seconds);
  const stateRef = useRef(paused);

  //   calculate seconds and start the timer
  const startTimer = () => {
    setSeconds(time * 60);
  };

  const countdown = () => {
    secondsRef.current--;
    setSeconds(secondsRef.current);
  };

  useEffect(() => {
    //  call startTimer to start the timer
    startTimer();

    // Assign values to references
    secondsRef.current = pomodoro * 60;
    setSeconds(secondsRef.current);

    //  set up an interval that will run every seconds
    console.log(displayMinutes);
    const t = setInterval(() => {
      if (stateRef.current) return;
      if (seconds.current === 0) console.log('timer over');
      countdown();
    }, 1000);

    return () => {
      clearInterval();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 place-self-end w-full md:rounded-none">
      <div className="flex items-center justify-center p-4 ">
        <div className="flex flex-col text-slate-700 text-4xl font-bold justify-center items-center">
          {`${displayMinutes} : ${displaySeconds} `}
        </div>
      </div>
      {/* 
      <div className="flex justify-center gap-4">
        <button
          className="bg-slate-700 text-white rounded-md px-4 py-2 active:translate-y-1"
          onClick={() => {
            setPomodoro((pomodoro) => pomodoro - 25);
            secondsRef.current = (pomodoro - 25) * 60;
            setSeconds(secondsRef.current);
          }}
        >
          -
        </button>
        <button
          className="bg-slate-700 text-white rounded-md px-4 py-2 active:translate-y-1 "
          onClick={() => {
            setPaused(!paused);
            stateRef.current = paused;
          }}
        >
          <PauseIcon className="h-6 w-6 text-white" />
        </button>
        <button
          className="bg-slate-700 text-white rounded-md px-4 py-2 active:translate-y-1"
          onClick={() => {
            setPomodoro((pomodoro) => pomodoro + 25);
            secondsRef.current = (pomodoro + 25) * 60;
            setSeconds(secondsRef.current);
          }}
        >
          +
        </button>
      </div> */}
    </div>
  );
};

export default Timer;

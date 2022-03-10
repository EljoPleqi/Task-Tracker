import React, { useState, useEffect, useRef } from 'react';
import {
  PlayIcon,
  PauseIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline';

const Timer = ({ time }) => {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(true);

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
    secondsRef.current = time * 60;
    setSeconds(secondsRef.current);

    //  set up an interval that will run every seconds

    const t = setInterval(() => {
      if (stateRef.current) return;
      if (secondsRef.current === 1) {
        clearInterval(t);
        stateRef.current = !paused;
      }

      countdown();
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className=" text-[#263a44] text-4xl font-bold  py-4 ">
        {`${displayMinutes} : ${displaySeconds} `}
      </div>
      <span className="p-4 b bg-[#60B158] text-white rounded-lg">
        <span
          className="flex justify-center gap-2 cursor-pointer "
          onClick={() => {
            setPaused(!paused);
            stateRef.current = !paused;
          }}
        >
          {paused ? (
            <>
              <PlayIcon className="h-6 w-6" /> <p> Start Timer </p>
            </>
          ) : (
            <>
              <PauseIcon className="h-6 w-6" /> <p> Pause Timer</p>
            </>
          )}
        </span>
      </span>
    </div>
  );
};

export default Timer;

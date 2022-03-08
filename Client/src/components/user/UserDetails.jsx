import React from 'react';
import img from '../../img/wUY0Ueb.jpeg';

const UserDetails = () => {
  return (
    <div className=" grid grid-cols-twoThree p-6  bg-[#F7F6F3] rounded-lg shadow-sm">
      <img
        src={img}
        alt=""
        className=" h-16 w-16 bg-green-500 rounded-full place-self-center
      "
      />
      <div className="flex flex-col place-content-center">
        <p>Username</p>
        <span className="flex gap-2">
          <p>Today's tasks</p>
          <p>99</p>
        </span>
      </div>
    </div>
  );
};

export default UserDetails;

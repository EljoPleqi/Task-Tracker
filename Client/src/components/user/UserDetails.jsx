import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user, accessToken } from '../../atoms.js';
import img from '../../img/wUY0Ueb.jpeg';

const UserDetails = () => {
  const [userData, setUserData] = useRecoilState(user);
  const accessTkn = useRecoilValue(accessToken);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:3030', {
        headers: { authorization: accessTkn },
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      });
  }, []);

  console.log(userData);
  return (
    <div className=" grid grid-cols-twoThree p-6  bg-[#F7F6F3] rounded-lg shadow-sm">
      <img
        src={`http://127.0.0.1:3030/${userData.avatar}`}
        alt=""
        className=" h-16 w-16 bg-green-500 object-cover rounded-full place-self-center
      "
      />
      <div className="flex flex-col place-content-center">
        <p>{userData.userEmail}</p>
        <span className="flex gap-2">
          <p>Today's tasks</p>
          <p>99</p>
        </span>
      </div>
    </div>
  );
};

export default UserDetails;

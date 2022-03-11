import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../../../atoms';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SignUpScreen = ({ setToggleSignUp }) => {
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verPassword, setVerPassword] = useState('');

  const [loginStatus, setLoginStatus] = useRecoilState(loginState);

  const navigate = useNavigate();

  const createUser = (e) => {
    e.preventDefault();

    const user = new FormData();
    user.append('avatar', avatar);
    user.append('email', email);
    user.append('password', password);
    user.append('verPassword', verPassword);

    axios.post('http://localhost:3030/singup', user).then((res) => {
      setLoginStatus(true);
    });
  };

  if (loginStatus) navigate('/');

  return (
    <div className="bg-[#E2DDD3] h-screen w-full flex flex-col p-4 justify-center items-center">
      <form
        className="flex flex-col items-center justify-center w-72 gap-8 py-44"
        onSubmit={createUser}
      >
        <div className="flex flex-col gap-2 w-full">
          <input
            type="file"
            name="avatar"
            className="bg-[#E2DDD3] py-2 px-4 rounded-lg file:px-4 file:py-2 file:bg-[#857557] file:rounded-full file:text-[#857557] 
            file:mr-4 file:bg-opacity-30 hover:file:bg-opacity-60 file:border-0"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder={`jonedoe@email.com`}
            className={` bg-[#F7F6F3] justify-between p-4   rounded-lg shadow-sm/> text-center`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={`password`}
            className={` bg-[#F7F6F3] justify-between p-4 rounded-lg shadow-sm/> text-center`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder={`password`}
            className={` bg-[#F7F6F3] justify-between p-4 rounded-lg shadow-sm/> text-center`}
            onChange={(e) => setVerPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full flex gap-2 bg-[#263a44] text-white p-4 rounded-lg items-center justify-center active:translate-y-1 active:bg-[#162127]"
        >
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

export default SignUpScreen;

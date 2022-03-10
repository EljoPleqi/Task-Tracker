import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { loginState, accessToken } from '../../../atoms';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [accessTkn, setAccessTkn] = useRecoilState(accessToken);

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3030/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.error) alert(res.error);
        setLoginStatus(true);
        setAccessTkn(res.data.accessToken);

        console.log(res.data);
        navigate('/');
      });
  };

  return (
    <div className="bg-[#E2DDD3] h-screen w-full flex flex-col p-4 justify-center items-center">
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center justify-center w-72 gap-8 py-44"
      >
        <div className="flex flex-col gap-2 w-full">
          <input
            type="email"
            placeholder={`jonhdoe@email.com`}
            className={` bg-[#F7F6F3] justify-between p-4   rounded-lg shadow-sm/> text-center`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={`password`}
            className={` bg-[#F7F6F3] justify-between p-4 rounded-lg shadow-sm/> text-center`}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full flex gap-2 bg-[#263a44] text-white p-4 rounded-lg items-center justify-center"
        >
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

import React from 'react';
import { Outlet } from 'react-router';
import { useRecoilValue } from 'recoil';
import { loginState, accessToken } from '../../atoms';
import Auth from '../auth/Auth';

const ProtectedRoutes = () => {
  const loginStatus = useRecoilValue(loginState);

  return <div>{loginStatus ? <Outlet /> : <Auth />}</div>;
};

export default ProtectedRoutes;

import React, { useState } from 'react';
import LoginScreen from './components/auth/login/LoginScreen';
import SignUp from './components/auth/sign-up/SignUp';

const Auth = () => {
  const [toggleSignUp, setToggleSignUp] = useState(true);

  return (
    <div>
      {toggleSignUp ? (
        <SignUp setLogin={setLogin} setToggleSignUp={setToggleSignUp} />
      ) : (
        <LoginScreen setLogin={setLogin} setToggleSignUp={setToggleSignUp} />
      )}
    </div>
  );
};

export default Auth;

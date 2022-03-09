import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { atom } from 'recoil';

import Home from './components/home/Home';
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes';
import LoginScreen from './components/auth/login/LoginScreen';
import SignUpScreen from './components/auth/sign-up/SignUpScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

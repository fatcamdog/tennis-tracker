import { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';

import Home from './components/Home';
import Docs from './components/Docs';
import Navbar from './components/Navbar/Navbar';
import Matches from './components/matches/Matches';
import Match from './components/matches/Match';
import EditMatch from './components/edit/EditMatch';
import CreateMatch from './components/create/CreateMatch';
import Tracker from './components/track/Tracker';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Analytics from './components/analytics/Analytics';

import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { login } from './redux/auth';
import { IUserState } from './utils/interfaces';
import { useLogout } from './hooks/authHooks';

import './index.css';

const ProtectedRoute: FC<IUserState> = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

export default function App() {
  const [rendered, setRendered] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { logoutUser } = useLogout();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (user) dispatch(login(user));
    setRendered(true);
  }, []);

  return (
    <div>
      <Navbar user={user!} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          {rendered ? (
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:id" element={<Match />} />
              <Route path="/matches/edit/:id" element={<EditMatch />} />
              <Route path="/matches/create" element={<CreateMatch />} />
              <Route path="/matches/track/:id" element={<Tracker />} />
              <Route path="/matches/analytics/:id" element={<Analytics />} />
            </Route>
          ) : (
            <></>
          )}
          <Route
            path="/signup"
            element={
              !user ? <Signup /> : <Navigate to="/matches" replace={true} />
            }
          />
          <Route
            path="/login"
            element={
              !user ? <Login /> : <Navigate to="/matches" replace={true} />
            }
          />
          <Route path="*" element={<p>404 page</p>} />
        </Routes>
      </div>
    </div>
  );
}

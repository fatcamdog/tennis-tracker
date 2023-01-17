import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IUserProps } from '../../utils/interfaces';
import { useLogout } from '../../hooks/authHooks';

const Navbar: FC<IUserProps> = ({ user }) => {
  const { logoutUser } = useLogout();

  // logout user
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="flex items-center justify-between p-5 bg-neutral">
      <div>
        <Link
          to="/matches"
          className="text-3xl font-semibold no-underline text-primary"
        >
          Tennis Tracker
        </Link>
      </div>
      {user ? (
        <>
          <div>
            <Link to="/matches">Matches</Link>
            <Link to="/matches/analytics">Analytics</Link>
            <Link to="/matches/opponents">Opponents</Link>
          </div>
          <div className="flex items-center">
            <p className="mr-5 text-primary">{user.name}</p>
            <button
              onClick={handleLogout}
              className="normal-case btn btn-outline btn-accent btn-sm"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link to="/signup" className="mr-3">
            Sign Up
          </Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

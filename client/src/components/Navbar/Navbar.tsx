import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IUserProps } from '../../utils/interfaces';
import { useLogout } from '../../hooks/authHooks';

const Navbar: FC<IUserProps> = ({ user }) => {
  const { logoutUser } = useLogout();
  const { pathname } = useLocation();

  console.log(pathname);

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
          <div className="flex gap-4 text-lg">
            <Link
              to="/matches"
              className={`hover:text-accent relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-0 after:hover:scale-100 after:transition-transform after:origin-left after:duration-200 ${
                pathname === '/matches' ? 'after:scale-100 text-accent' : ''
              }`}
            >
              Matches
            </Link>
            <Link
              to="/progress"
              className={`hover:text-accent relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-0 after:hover:scale-100 after:transition-transform after:origin-left after:duration-200 ${
                pathname === '/progress' ? 'after:scale-100 text-accent' : ''
              }`}
            >
              Progress
            </Link>
            <Link
              to="/opponents"
              className={`hover:text-accent relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-0 after:hover:scale-100 after:transition-transform after:origin-left after:duration-200 ${
                pathname === '/opponents' ? 'after:scale-100 text-accent' : ''
              }`}
            >
              Opponents
            </Link>
            <Link
              to="/awards"
              className={`hover:text-accent relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:scale-0 after:hover:scale-100 after:transition-transform after:origin-left after:duration-200 ${
                pathname === '/awards' ? 'after:scale-100 text-accent' : ''
              }`}
            >
              Awards
            </Link>
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

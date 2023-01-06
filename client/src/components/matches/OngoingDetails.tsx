import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IMatchUserProps } from '../../utils/interfaces';
import calculateMinsAndHours from '../../utils/minsAndHours';

// render detailed data for ongoing matches
const OngoingDetails: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <div className="relative flex flex-col px-16 py-5 bg-neutral rounded-xl">
      <div>
        <div className="grid grid-cols-2">
          <p className={`${match.serving ? 'flex items-center gap-x-3' : ''}`}>
            {user.name}
            {match.serving ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="#000000"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            ) : (
              <></>
            )}
          </p>
          <div className="flex gap-2 justify-self-center tabular-nums">
            <b className="mr-3">
              {parseInt(match.userDisplayPoints) !== 0
                ? match.userDisplayPoints
                : '00'}
            </b>
            {match.userGames.map((game: number, index) => (
              <p key={`user-${index}`}>{game}</p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p className={`${!match.serving ? 'flex items-center gap-x-3' : ''}`}>
            {match.opponent}
            {!match.serving ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="#000000"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            ) : (
              <></>
            )}
          </p>
          <div className="flex gap-2 justify-self-center tabular-nums">
            <b className="mr-3">
              {parseInt(match.oppDisplayPoints) !== 0
                ? match.oppDisplayPoints
                : '00'}
            </b>
            {match.oppGames.map((game: number, index) => (
              <p key={`opp-${index}`}>{game}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex gap-5">
        <div>
          <p className="text-sm text-gray-400">Date</p>
          <p>
            {new Date(match.createdAt).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Duration</p>
          <p>{calculateMinsAndHours(match.duration)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Tracking Mode</p>
          <p>
            {match.trackingMode.charAt(0).toUpperCase() +
              match.trackingMode.slice(1)}
          </p>
        </div>
      </div>

      <div className="absolute dropdown dropdown-left top-2 right-2">
        <label tabIndex={0} className="border-none btn btn-sm hover:bg-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to={`/matches/track/${match.id}`}>Track</Link>
          </li>
          <li>
            <Link to={`/matches/edit/${match.id}`}>Edit</Link>
          </li>
          <li>
            <Link to={`/matches/edit/${match.id}`}>Delete</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OngoingDetails;

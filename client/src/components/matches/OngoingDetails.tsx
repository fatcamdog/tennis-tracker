import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IMatchUserProps } from '../../utils/interfaces';
import calculateMinsAndHours from '../../utils/minsAndHours';

// render detailed data for ongoing matches
const OngoingDetails: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <div className="bg-neutral rounded-lg flex flex-col mb-3">
      <div className="flex gap-3 align-middle justify-around mt-3">
        <Link
          className="text-accent hover:text-black"
          to={`/matches/track/${match.id}`}
        >
          Track
        </Link>
        <Link
          className="text-accent hover:text-black"
          to={`/matches/analytics/${match.id}`}
        >
          Analytics
        </Link>
        <Link
          className="text-accent hover:text-black"
          to={`/matches/edit/${match.id}`}
        >
          Edit
        </Link>
        <Link
          className="text-accent hover:text-black"
          to={`/matches/edit/${match.id}`}
        >
          Delete
        </Link>
      </div>
      <div className="p-5">
        <div className="flex justify-between">
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
          <div className="tabular-nums flex gap-3 mr-20">
            <b className="">
              {parseInt(match.userDisplayPoints) !== 0
                ? match.userDisplayPoints
                : '00'}
            </b>
            {match.userGames.map((game: number, index) => (
              <p key={`user-${index}`}>{game}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
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
          <div className="tabular-nums flex gap-3 mr-20">
            <b className="">
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
      <div className="flex justify-around mb-3">
        <div>
          <p className="text-stone-300">Date</p>
          <p>
            {new Date(match.createdAt).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div>
          <p className="text-stone-300">Duration</p>
          <p>{calculateMinsAndHours(match.duration)}</p>
        </div>
        <div>
          <p className="text-stone-300">Tracking Mode</p>
          <p>
            {match.trackingMode.charAt(0).toUpperCase() +
              match.trackingMode.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OngoingDetails;

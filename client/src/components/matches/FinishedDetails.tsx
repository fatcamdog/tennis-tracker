import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IMatchUserProps } from '../../utils/interfaces';
import calculateMinsAndHours from '../../utils/minsAndHours';

// render detailed data for finished matches
const FinishedDetails: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <Link
      to={`/matches/${match.id}`}
      className="flex items-center gap-5 p-5 transition-transform bg-neutral rounded-xl hover:scale-105"
    >
      {match.won ? (
        <h3 className="p-2 font-semibold rounded text-success outline outline-2 outline-success w-fit">
          {match.userSets} - {match.oppSets}
        </h3>
      ) : (
        <h3 className="p-2 font-semibold rounded text-error outline outline-2 outline-error w-fit">
          {match.userSets} - {match.oppSets}
        </h3>
      )}
      <div className="flex flex-col gap-2">
        <p>
          {user.name} vs {match.opponent}
        </p>
        <div className="flex text-sm">
          <p>
            {new Date(match.createdAt).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <div className="divider divider-horizontal"></div>
          <p>{calculateMinsAndHours(match.duration)}</p>
          <div className="divider divider-horizontal"></div>
          <p>
            {match.trackingMode.charAt(0).toUpperCase() +
              match.trackingMode.slice(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FinishedDetails;

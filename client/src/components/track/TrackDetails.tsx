import { FC } from 'react';

import { IMatchProps } from '../../utils/interfaces';

// renders detailed data when on tracking page
const TrackDetails: FC<IMatchProps> = ({ match }) => {
  return (
    <div>
      <p>{match.serving ? 'Serving' : 'Returning'}</p>
      <p>Side: {match.side}</p>
      <p>
        Sets:{' '}
        <b>
          {match.userSets}-{match.oppSets}
        </b>
      </p>
      User games:{' '}
      {match.userGames.map((game: number, index) => (
        <b key={`user-${index}`}>{game}</b>
      ))}
      <br />
      Opp games:{' '}
      {match.oppGames.map((game: number, index) => (
        <b key={`opp-${index}`}>{game}</b>
      ))}
      <p>
        Points:{' '}
        <b>
          {match.userDisplayPoints}-{match.oppDisplayPoints}
          <br />
          {match.userPoints}-{match.oppPoints}
        </b>
      </p>
      <p>
        The left side is the deuce side and the right side of the court is the
        ad side
      </p>
    </div>
  );
};

export default TrackDetails;

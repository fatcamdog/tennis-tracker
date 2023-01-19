import { FC } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

const BasicAnalytics: FC<IMatchUserProps> = ({ match, user }) => {
  // calculate points won for user and opponent
  const pointsWon = (user: boolean): number => {
    let pointsWon = 0;

    match.pointDetails.map((point) => {
      if (point.won === user) pointsWon++;
    });

    return pointsWon;
  };

  return (
    <div>
      <div>
        <p>{user.name}:</p>
        <div>
          <p>Points won: {pointsWon(true)}</p>
          <p>Games won:</p>
          <p>Sets won:</p>
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}:</p>
        <div>
          <p>Points won: {pointsWon(false)}</p>
          <p>Games won:</p>
          <p>Sets won:</p>
        </div>
      </div>
    </div>
  );
};

export default BasicAnalytics;

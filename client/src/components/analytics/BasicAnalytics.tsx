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

  // calculate games won for user and opponent
  const gamesWon = (user: boolean): number => {
    let gamesWon = 0;

    if (user) {
      match.userGames.map((set) => {
        gamesWon += set;
      });
    } else {
      match.oppGames.map((set) => {
        gamesWon += set;
      });
    }

    return gamesWon;
  };

  // calculate sets won for user and opponent
  const setsWon = (user: boolean): number => {
    if (user) {
      return match.userSets;
    } else {
      return match.oppSets;
    }
  };

  return (
    <div>
      <div>
        <p>{user.name}:</p>
        <div>
          <p>Points won: {pointsWon(true)}</p>
          <p>Games won: {gamesWon(true)}</p>
          <p>Sets won: {setsWon(true)}</p>
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}:</p>
        <div>
          <p>Points won: {pointsWon(false)}</p>
          <p>Games won: {gamesWon(false)}</p>
          <p>Sets won: {setsWon(false)}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicAnalytics;

import { FC } from 'react';

import { IHandleMatchUserPointWonProps } from '../../../utils/interfaces';

const PointWonStage: FC<IHandleMatchUserPointWonProps> = ({
  match,
  user,
  handlePointWon,
}) => {
  return (
    <div>
      <p>Who won the point?</p>
      <div>
        <button className="btn btn-accent" onClick={() => handlePointWon(true)}>
          {user.name}
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handlePointWon(false)}
        >
          {match.opponent}
        </button>
      </div>
    </div>
  );
};

export default PointWonStage;

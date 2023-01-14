import { FC } from 'react';

import { IHandleStartingPointWonProps } from '../../../utils/interfaces';

const PointWonStage: FC<IHandleStartingPointWonProps> = ({
  handlePointWon,
  match,
  user,
}) => {
  return (
    <div>
      <p>Who won the point?</p>
      <div>
        <button onClick={() => handlePointWon(true)} className="btn btn-accent">
          {user.name}
        </button>
        <button
          onClick={() => handlePointWon(false)}
          className="btn btn-accent"
        >
          {match.opponent}
        </button>
      </div>
    </div>
  );
};

export default PointWonStage;

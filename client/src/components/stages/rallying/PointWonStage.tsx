import { FC } from 'react';

import { IHandlePointWonStageProps } from '../../../utils/interfaces';

const PointWonStage: FC<IHandlePointWonStageProps> = ({ handlePointWon }) => {
  return (
    <div>
      <p>Did you win the point?</p>
      <button className="btn btn-accent" onClick={() => handlePointWon(true)}>
        Won
      </button>
      <button className="btn btn-accent" onClick={() => handlePointWon(false)}>
        Lost
      </button>
    </div>
  );
};

export default PointWonStage;

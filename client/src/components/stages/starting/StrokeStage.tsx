import { FC } from 'react';

import { IHandleShotStrokeProps } from '../../../utils/interfaces';

const StrokeStage: FC<IHandleShotStrokeProps> = ({ handleShotStroke }) => {
  return (
    <div>
      <p>What did the returner hit?</p>
      <div>
        <div>
          <button
            onClick={() => handleShotStroke('forehand')}
            className="btn btn-accent"
          >
            Forehand
          </button>
          <button
            onClick={() => handleShotStroke('backhand')}
            className="btn btn-accent"
          >
            Backhand
          </button>
        </div>
        <p>Or</p>
        <div>
          <button
            onClick={() => handleShotStroke('ace')}
            className="btn btn-accent"
          >
            Aced
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrokeStage;

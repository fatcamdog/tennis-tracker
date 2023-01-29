import { FC } from 'react';

import { IHandleSideStageProps } from '../../../utils/interfaces';

const SideStage: FC<IHandleSideStageProps> = ({ handleShotSide }) => {
  return (
    <div>
      <p>What side was your last shot on?</p>
      <div>
        <button
          className="btn btn-accent"
          onClick={() => handleShotSide('forehand')}
        >
          Forehand
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleShotSide('backhand')}
        >
          Backhand
        </button>
        <p>Or</p>
        <button
          className="btn btn-accent"
          onClick={() => handleShotSide('overhead')}
        >
          Overhead
        </button>
      </div>
    </div>
  );
};

export default SideStage;

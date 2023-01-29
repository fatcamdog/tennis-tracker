import { FC } from 'react';

import { IHandleMethodStageProps } from '../../../utils/interfaces';

const MethodStage: FC<IHandleMethodStageProps> = ({
  handleShotMethod,
  hitter,
}) => {
  return (
    <div>
      <p>
        What caused {hitter === 'user' ? 'your' : "the opponent's"} last shot?
      </p>
      <div>
        <button
          className="btn btn-accent"
          onClick={() => handleShotMethod('unforced_error')}
        >
          Unforced error
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleShotMethod('forced_error')}
        >
          Forced error
        </button>
      </div>
    </div>
  );
};

export default MethodStage;

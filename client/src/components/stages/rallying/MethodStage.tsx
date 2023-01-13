import { FC } from 'react';

import { IHandleMethodStageProps } from '../../../utils/interfaces';

const MethodStage: FC<IHandleMethodStageProps> = ({
  handleShotMethod,
  shotInPlay,
}) => {
  return (
    <div>
      <p>What was the result of your last shot?</p>
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
        {!shotInPlay ? (
          <></>
        ) : (
          <button
            className="btn btn-accent"
            onClick={() => handleShotMethod('winner')}
          >
            Winner
          </button>
        )}
      </div>
    </div>
  );
};

export default MethodStage;

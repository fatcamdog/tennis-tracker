import { FC } from 'react';

import { IHandleTypeStageProps } from '../../../utils/interfaces';

const TypeStage: FC<IHandleTypeStageProps> = ({ handleShotType }) => {
  return (
    <div>
      <p>What type was your last shot?</p>
      <div>
        <button
          className="btn btn-accent"
          onClick={() => handleShotType('groundstroke')}
        >
          Groundstroke
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleShotType('slice')}
        >
          Slice
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleShotType('volley')}
        >
          Volley
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleShotType('dropshot')}
        >
          Dropshot
        </button>
      </div>
    </div>
  );
};

export default TypeStage;

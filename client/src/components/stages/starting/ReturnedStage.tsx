import { FC } from 'react';

import { IHandleServeReturnedProps } from '../../../utils/interfaces';

const ReturnedStage: FC<IHandleServeReturnedProps> = ({
  handleShotReturned,
}) => {
  return (
    <div>
      <p>Was the serve returned?</p>
      <div>
        <button
          onClick={() => handleShotReturned(true)}
          className="btn btn-accent"
        >
          Returned
        </button>
        <button
          onClick={() => handleShotReturned(false)}
          className="btn btn-accent"
        >
          Unreturned
        </button>
      </div>
    </div>
  );
};

export default ReturnedStage;

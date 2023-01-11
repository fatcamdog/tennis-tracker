import { FC } from 'react';

import { IHandleHitterStageProps } from '../../utils/interfaces';

const HitterStage: FC<IHandleHitterStageProps> = ({
  handleShotHitter,
  match,
  user,
}) => {
  return (
    <div>
      <p>Who hit the last shot?</p>
      <div>
        <button
          className="btn btn-accent"
          onClick={() => handleShotHitter('user')}
        >
          {user.name}
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleShotHitter('opponent')}
        >
          {match.opponent}
        </button>
      </div>
    </div>
  );
};

export default HitterStage;

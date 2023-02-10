import { FC, MouseEvent } from 'react';

import { IHandleMatchUserPointWonProps } from '../../../utils/interfaces';

const PointWonStage: FC<IHandleMatchUserPointWonProps> = ({
  match,
  user,
  handlePointWon,
}) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    console.log(
      e.pageX - e.currentTarget.offsetLeft,
      e.pageY - e.currentTarget.offsetTop
    );
  };

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
      <button className="btn btn-accent mt-7" onClick={handleClick}>
        Test
      </button>
    </div>
  );
};

export default PointWonStage;

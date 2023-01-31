import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const PlusMinus: FC = () => {
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  const scoreCalculator = (user: string): number => {
    let score: number = 0;

    match.pointDetails.map((point) => {
      if (point.hitter === user) {
        // check if it was unforced, then -1 from score
        if (
          point.method === 'unforced_error' ||
          point.method === 'double_fault'
        )
          score--;
        // check if winner, then add 1
        if (point.method === 'winner' || point.method === 'ace') score++;
      }
      // check if it was a forceing error
      if (point.hitter !== user && point.method === 'forced_error') score++;
    });

    return score;
  };

  return (
    <div>
      <p>
        <b>Agressive margin</b> is a scoring stat in tennis. It takes into
        account unforced errors which subract your score by 1 and forceing shots
        or winners which add 1 to your score.
      </p>
      <p>
        Roger Federer: <b>+25</b>
      </p>
      <p>
        Top juniors: <b>+10</b>
      </p>
      <p>
        Average adult <b>-15</b>
      </p>
      <div>
        <p>{user?.name}</p>
        <div>
          <p>Score: {scoreCalculator('user')}</p>
        </div>
      </div>
      <div>
        <p>{match.opponent}</p>
        <p>Score: {scoreCalculator('opponent')}</p>
      </div>
    </div>
  );
};

export default PlusMinus;

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

  // calculates aggresive margin (am) for one specific side
  const sideScoreCalculator = (user: string, stroke: string): number => {
    let score: number = 0;

    match.pointDetails.map((point) => {
      if (point.hitter === user) {
        // check if it was unforced -> -1 from score
        if (
          (point.method === 'unforced_error' ||
            point.method === 'double_fault') &&
          point.stroke!.indexOf(stroke) > -1
        ) {
          score--;
        }
        // check if winner -> +1
        if (
          (point.method === 'winner' || point.method === 'ace') &&
          point.stroke!.indexOf(stroke) > -1
        ) {
          score++;
        }
      }
      // check if forceing error
      if (
        point.hitter !== user &&
        point.method === 'forced_error' &&
        point.stroke!.indexOf(stroke) > -1
      ) {
        score++;
      }
    });

    return score;
  };

  return (
    <div>
      <div>
        <p>
          <b>Agressive margin</b> is a scoring stat in tennis. It takes into
          account unforced errors which subract your score by 1 and forceing
          shots or winners which add 1 to your score.
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
      </div>
      <br />
      <div>
        <p>{user?.name}</p>
        <div>
          <p>Score: {scoreCalculator('user')}</p>
          <p>Forehand score: {sideScoreCalculator('user', 'forehand')}</p>
          <p>Backhand score: {sideScoreCalculator('user', 'backhand')}</p>
          <p>Serve score: {sideScoreCalculator('user', 'serve')}</p>
          <p>Overhead score: {sideScoreCalculator('user', 'overhead')}</p>
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}</p>
        <p>Score: {scoreCalculator('opponent')}</p>
        <p>Forehand score: {sideScoreCalculator('opponent', 'forehand')}</p>
        <p>Backhand score: {sideScoreCalculator('opponent', 'backhand')}</p>
        <p>Serve: {sideScoreCalculator('opponent', 'serve')}</p>
        <p>Overhead: {sideScoreCalculator('opponent', 'overhead')}</p>
      </div>
    </div>
  );
};

export default PlusMinus;

import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const RallyingStats: FC = () => {
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  // calculates amount of unforced errors and forced errors for both players
  const errors = (method: string, user: boolean): number => {
    let errorCount: number = 0;

    match.pointDetails.map((point) => {
      if (!point.won === user && point.method === method) {
        errorCount++;
      }
    });

    return errorCount;
  };

  return (
    <div>
      <div>
        <p>{user?.name}:</p>
        <div>
          <p>Unforced errors: {errors('unforced_error', true)}</p>
          <p>Forced errors: {errors('forced_error', true)}</p>
          <p>Winners</p>
          <p>Unforced errors on forehand</p>
          <p>Unforced errors on backhand</p>
          <p>Forced errors on forehand</p>
          <p>Forced errors on backhand</p>
          <p>Winners on forehand</p>
          <p>Winners on backhand</p>
          <p>Unforced errors on groundstrokes</p>
          <p>Forced errors on groundstrokes</p>
          <p>Winners on groundstrokes</p>
          <p>Unforced errors on volleys</p>
          <p>Forced errors on volleys</p>
          <p>Winners on volleys</p>
          <p>Unforced errors on overheads</p>
          <p>Forced errors on overhead</p>
          <p>Winners on overheads</p>
          <p>Unforced errors on slices</p>
          <p>Forced errors on slices</p>
          <p>Winners on slices</p>
          <p>Unforced errors on dropshots</p>
          <p>Forced errors on dropshots</p>
          <p>Winners on dropshots</p>
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}:</p>
        <div>
          <p>Unforced errors</p>
          <p>Forced errors</p>
          <p>Winners</p>
          <p>Unforced errors on forehand</p>
          <p>Unforced errors on backhand</p>
          <p>Forced errors on forehand</p>
          <p>Forced errors on backhand</p>
          <p>Winners on forehand</p>
          <p>Winners on backhand</p>
          <p>Unforced errors on groundstrokes</p>
          <p>Forced errors on groundstrokes</p>
          <p>Winners on groundstrokes</p>
          <p>Unforced errors on volleys</p>
          <p>Forced errors on volleys</p>
          <p>Winners on volleys</p>
          <p>Unforced errors on overheads</p>
          <p>Forced errors on overhead</p>
          <p>Winners on overheads</p>
          <p>Unforced errors on slices</p>
          <p>Forced errors on slices</p>
          <p>Winners on slices</p>
          <p>Unforced errors on dropshots</p>
          <p>Forced errors on dropshots</p>
          <p>Winners on dropshots</p>
        </div>
      </div>
    </div>
  );
};

export default RallyingStats;

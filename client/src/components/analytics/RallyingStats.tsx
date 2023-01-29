import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const RallyingStats: FC = () => {
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  // calculates amount of unforced errors for both players
  const unforcedErrors = (user: boolean): number => {
    let errorCount: number = 0;

    match.pointDetails.map((point) => {
      if (point.won !== user && point.method === 'unforced_error') {
        errorCount++;
      }
    });

    return errorCount;
  };

  // calculates forced errors
  const forcedErrors = (user: boolean): number => {
    let forcedErrors: number = 0;

    match.pointDetails.map((point) => {
      if (point.won !== user && point.method === 'forced_error') {
        forcedErrors++;
      }
    });

    return forcedErrors;
  };

  // calculates forced shots
  const forceingShots = (user: boolean): number => {
    let forceingShots: number = 0;

    match.pointDetails.map((point) => {
      if (point.won === user && point.method === 'forced_error') {
        forceingShots++;
      }
    });

    return forceingShots;
  };

  // calculates amount of winners for each player
  const winners = (user: boolean): number => {
    let winnerCount: number = 0;

    match.pointDetails.map((point) => {
      if (point.won === user && point.method === 'winner') {
        winnerCount++;
      }
    });

    return winnerCount;
  };

  // counts un forced erros for forehand or backhand
  const sideSpecificUnforced = (user: boolean, side: string): number => {
    let unforcedErrors: number = 0;

    match.pointDetails.map((point) => {
      if (point.won !== user && point.stroke!.indexOf(side) > -1) {
        unforcedErrors++;
      }
    });

    return unforcedErrors;
  };

  return (
    <div>
      <div>
        <p>{user?.name}:</p>
        <div>
          <p>Unforced errors: {unforcedErrors(true)}</p>
          <p>Forced errors: {forcedErrors(true)}</p>
          <p>Forceing shots: {forceingShots(true)}</p>
          <p>Winners: {winners(true)}</p>
          <p>
            Unforced errors on forehand:{' '}
            {sideSpecificUnforced(true, 'forehand')}
          </p>
          <p>
            Unforced errors on forehand:{' '}
            {sideSpecificUnforced(true, 'backhand')}
          </p>
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
      {/* <div>
        <p>{match.opponent}:</p>
        <div>
          <p>Add stuff here later</p>
        </div>
      </div> */}
    </div>
  );
};

export default RallyingStats;

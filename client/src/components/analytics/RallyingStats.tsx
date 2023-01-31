import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const RallyingStats: FC = () => {
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  // calculates all 4 fields: unforced errors, forced errors, forceing shots, and winners
  const totalStats = (user: string, method: string): number => {
    let totalStats: number = 0;

    match.pointDetails.map((point) => {
      if (point.hitter === user && point.method === method) {
        totalStats++;
      }
    });

    return totalStats;
  };

  // counts unforced and forced errors for forehand or backhand
  const typeSpecificStats = (
    user: string,
    type: string,
    method: string
  ): number => {
    let unforcedErrors: number = 0;

    match.pointDetails.map((point) => {
      if (
        point.hitter === user &&
        point.stroke!.indexOf(type) > -1 &&
        point.method === method
      ) {
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
          <p>Unforced errors: {totalStats('user', 'unforced_error')}</p>
          <p>Forced errors: {totalStats('user', 'forced_error')}</p>
          <p>Forceing shots: {totalStats('opponent', 'forced_error')}</p>
          <p>Winners: {totalStats('user', 'winner')}</p>
          <p>
            Unforced errors on forehand:{' '}
            {typeSpecificStats('user', 'forehand', 'unforced_error')}
          </p>
          <p>
            Unforced errors on forehand:{' '}
            {typeSpecificStats('user', 'backhand', 'unforced_error')}
          </p>
          <p>
            Unforced errors on overhead:{' '}
            {typeSpecificStats('user', 'overhead', 'unforced_error')}
          </p>
          <p>
            Forced errors on forehand:{' '}
            {typeSpecificStats('user', 'forehand', 'forced_error')}
          </p>
          <p>
            Forced errors on backhand:{' '}
            {typeSpecificStats('user', 'backhand', 'forced_error')}
          </p>
          <p>
            Forced errors on overhead:{' '}
            {typeSpecificStats('user', 'overhead', 'forced_error')}
          </p>
          <p>
            Winners on forehand:{' '}
            {typeSpecificStats('user', 'forehand', 'winner')}
          </p>
          <p>
            Winners on backhand:{' '}
            {typeSpecificStats('user', 'backhand', 'winner')}
          </p>
          <p>
            Winners on overhead:{' '}
            {typeSpecificStats('user', 'overhead', 'winner')}
          </p>
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

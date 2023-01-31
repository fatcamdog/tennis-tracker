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
          <p>
            Unforced errors on groundstrokes:{' '}
            {typeSpecificStats('user', 'groundstroke', 'unforced_error')}
          </p>
          <p>
            Forced errors on groundstrokes:{' '}
            {typeSpecificStats('user', 'groundstroke', 'forced_error')}
          </p>
          <p>
            Winners on groundstrokes:{' '}
            {typeSpecificStats('user', 'groundstroke', 'winner')}
          </p>
          <p>
            Unforced errors on volleys:{' '}
            {typeSpecificStats('user', 'volley', 'unforced_error')}
          </p>
          <p>
            Forced errors on volleys:{' '}
            {typeSpecificStats('user', 'volley', 'forced_error')}
          </p>
          <p>
            Winners on volleys: {typeSpecificStats('user', 'volley', 'winner')}
          </p>
          <p>
            Unforced errors on slices:{' '}
            {typeSpecificStats('user', 'slice', 'unforced_error')}
          </p>
          <p>
            Forced errors on slices:{' '}
            {typeSpecificStats('user', 'slice', 'forced_error')}
          </p>
          <p>
            Winners on slices: {typeSpecificStats('user', 'slice', 'winner')}
          </p>
          <p>
            Unforced errors on dropshots:{' '}
            {typeSpecificStats('user', 'dropshot', 'unforced_error')}
          </p>
          <p>
            Forced errors on dropshots:{' '}
            {typeSpecificStats('user', 'dropshot', 'forced_error')}
          </p>
          <p>
            Winners on dropshots:{' '}
            {typeSpecificStats('user', 'dropshot', 'winner')}
          </p>
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}:</p>
        <div>
          <p>Unforced errors: {totalStats('opponent', 'unforced_error')}</p>
          <p>Forced errors: {totalStats('opponent', 'forced_error')}</p>
          <p>Forceing shots: {totalStats('opponent', 'forced_error')}</p>
          <p>Winners: {totalStats('opponent', 'winner')}</p>
          <p>
            Unforced errors on forehand:{' '}
            {typeSpecificStats('opponent', 'forehand', 'unforced_error')}
          </p>
          <p>
            Unforced errors on forehand:{' '}
            {typeSpecificStats('opponent', 'backhand', 'unforced_error')}
          </p>
          <p>
            Unforced errors on overhead:{' '}
            {typeSpecificStats('opponent', 'overhead', 'unforced_error')}
          </p>
          <p>
            Forced errors on forehand:{' '}
            {typeSpecificStats('opponent', 'forehand', 'forced_error')}
          </p>
          <p>
            Forced errors on backhand:{' '}
            {typeSpecificStats('opponent', 'backhand', 'forced_error')}
          </p>
          <p>
            Forced errors on overhead:{' '}
            {typeSpecificStats('opponent', 'overhead', 'forced_error')}
          </p>
          <p>
            Winners on forehand:{' '}
            {typeSpecificStats('opponent', 'forehand', 'winner')}
          </p>
          <p>
            Winners on backhand:{' '}
            {typeSpecificStats('opponent', 'backhand', 'winner')}
          </p>
          <p>
            Winners on overhead:{' '}
            {typeSpecificStats('opponent', 'overhead', 'winner')}
          </p>
          <p>
            Unforced errors on groundstrokes:{' '}
            {typeSpecificStats('opponent', 'groundstroke', 'unforced_error')}
          </p>
          <p>
            Forced errors on groundstrokes:{' '}
            {typeSpecificStats('opponent', 'groundstroke', 'forced_error')}
          </p>
          <p>
            Winners on groundstrokes:{' '}
            {typeSpecificStats('opponent', 'groundstroke', 'winner')}
          </p>
          <p>
            Unforced errors on volleys:{' '}
            {typeSpecificStats('opponent', 'volley', 'unforced_error')}
          </p>
          <p>
            Forced errors on volleys:{' '}
            {typeSpecificStats('opponent', 'volley', 'forced_error')}
          </p>
          <p>
            Winners on volleys:{' '}
            {typeSpecificStats('opponent', 'volley', 'winner')}
          </p>
          <p>
            Unforced errors on slices:{' '}
            {typeSpecificStats('opponent', 'slice', 'unforced_error')}
          </p>
          <p>
            Forced errors on slices:{' '}
            {typeSpecificStats('opponent', 'slice', 'forced_error')}
          </p>
          <p>
            Winners on slices:{' '}
            {typeSpecificStats('opponent', 'slice', 'winner')}
          </p>
          <p>
            Unforced errors on dropshots:{' '}
            {typeSpecificStats('opponent', 'dropshot', 'unforced_error')}
          </p>
          <p>
            Forced errors on dropshots:{' '}
            {typeSpecificStats('opponent', 'dropshot', 'forced_error')}
          </p>
          <p>
            Winners on dropshots:{' '}
            {typeSpecificStats('opponent', 'dropshot', 'winner')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RallyingStats;

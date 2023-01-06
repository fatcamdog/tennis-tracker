import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/reduxHooks';
import OngoingDetails from './OngoingDetails';
import { useFetchOne } from '../../hooks/fetchers';

// gets match with specific id
export default function Match() {
  // find current id
  const { id } = useParams();
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  const { error, empty, loading } = useFetchOne(
    `http://localhost:4000/api/matches/${id}`
  );

  return (
    <div>
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {empty ? (
            <div>Match can't be found</div>
          ) : (
            <OngoingDetails match={match} user={user!} />
          )}
        </div>
      )}
    </div>
  );
}

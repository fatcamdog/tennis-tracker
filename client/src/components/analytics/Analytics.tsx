import { useParams } from 'react-router-dom';

import { useFetchOne } from '../../hooks/fetchers';
import { useAppSelector } from '../../hooks/reduxHooks';
import ServingStats from './ServingStats';

export default function Analytics() {
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
            <div>No data</div>
          ) : (
            <div>
              <div>
                <h2>Serving stats</h2>
                <br />
                <ServingStats match={match} user={user!} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

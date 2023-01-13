import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/reduxHooks';
import { useFetchOne } from '../../hooks/fetchers';
import OngoingDetails from '../matches/OngoingDetails';
import TrackDetails from './TrackDetails';
import TrackServe from './TrackServe';
import TrackRally from './TrackRally';

export default function Tracker() {
  // finds match id
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
            <div className="p-5">
              {/* Shows normal match details if match finished, shows track details if match is ongoing */}
              {match.finished ? (
                <OngoingDetails match={match} user={user!} />
              ) : (
                <>
                  <TrackDetails match={match} />
                  {match.trackingMode === 'starting' ? (
                    <div>
                      <h1>Tracking Serve</h1>
                      <TrackServe match={match} user={user!} />
                    </div>
                  ) : (
                    <>
                      {match.trackingMode === 'rallying' ? (
                        <div>
                          <h1>Tracking Rallies</h1>
                          <TrackRally match={match} user={user!} />
                        </div>
                      ) : (
                        <>
                          {match.trackingMode === 'mentality' ? (
                            <h1>Tracking Mentality</h1>
                          ) : (
                            <div>Something went wrong</div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

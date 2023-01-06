import OngoingDetails from './OngoingDetails';
import FinishedDetails from './FinishedDetails';
import MatchForm from '../create/MatchForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useFetch } from '../../hooks/fetchers';

// gets all matches for user
export default function Matches() {
  const { ongoingMatches } = useAppSelector((state) => state.matches);
  const { finishedMatches } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  // calls custom hook to get loading and error state
  const { loading, error } = useFetch('http://localhost:4000/api/matches');

  const calculateIndex = (index: number): string => {
    if (index < 0) return `#${(ongoingMatches.length - 1).toString()}`;
    if (index >= ongoingMatches.length) return '#0';
    return `#${index.toString()}`;
  };

  return (
    <div className="flex justify-around p-10">
      {/* Display all ongoing matches in an image carousel */}
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {ongoingMatches.length == 0 && finishedMatches.length == 0 ? (
            <h1>Create match and it will appear here</h1>
          ) : (
            <div>
              <div>
                {ongoingMatches.length !== 0 ? (
                  <div>
                    <h2>Ongoing Matches</h2>
                    <div className="w-full max-w-lg gap-10 carousel">
                      {ongoingMatches.map((match, index) => (
                        <div
                          className="relative carousel-item"
                          id={index.toString()}
                          key={match.id}
                        >
                          <OngoingDetails match={match} user={user!} />
                          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                              href={calculateIndex(index - 1)}
                              className="border-none btn btn-circle btn-sm hover:bg-accent"
                            >
                              ❮
                            </a>
                            <a
                              href={calculateIndex(index + 1)}
                              className="border-none btn btn-circle btn-sm hover:bg-accent"
                            >
                              ❯
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {finishedMatches.length !== 0 ? (
                  <div className="mt-4">
                    <h2>Finished Matches</h2>
                    <div className="flex flex-col gap-4">
                      {finishedMatches.map((match) => (
                        <FinishedDetails
                          match={match}
                          user={user!}
                          key={match.id}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <MatchForm />
    </div>
  );
}

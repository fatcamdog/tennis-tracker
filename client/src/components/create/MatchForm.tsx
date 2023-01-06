import React, { FC, useState } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createMatch } from '../../redux/matches';
import { IMatch } from '../../utils/interfaces';

interface IMatchResponse {
  data: IMatch;
}

const MatchForm: FC = () => {
  const [opponent, setOpponent] = useState<string>('');
  const [numSets, setNumSets] = useState<number>(3);
  const [trackingMode, setTrackingMode] = useState<string>('starting');
  const [duration, setDuration] = useState<number>(0);
  const [tiebreak, setTiebreak] = useState<boolean>(false);
  const [serving, setServing] = useState<boolean>(false);
  const [suddenDeath, setSuddenDeath] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // check if there is a user then create match
    if (user) {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.post<IMatchResponse>(
          'http://localhost:4000/api/matches/',
          {
            won: false,
            finished: false,
            opponent,
            userSets: 0,
            oppSets: 0,
            userGames: [0],
            oppGames: [0],
            userPoints: 0,
            oppPoints: 0,
            userDisplayPoints: '0',
            oppDisplayPoints: '0',
            pointDetails: [],
            numSets,
            trackingMode,
            duration,
            tiebreak,
            serving,
            suddenDeath,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setIsLoading(false);
        // update matches state
        dispatch(createMatch(data));
      } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) setError(error.response?.data);
        else setError('Unexpected error: ' + error);
      }
    }

    setOpponent('');
    setNumSets(3);
    setTrackingMode('starting');
    setDuration(0);
    setTiebreak(false);
    setServing(false);
    setSuddenDeath(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-3 text-2xl">Start a new match</h1>
        <div className="w-full max-w-xs gap-4 form-control">
          <input
            type="text"
            placeholder="Opponent's name..."
            className="w-full max-w-xs input input-bordered bg-neutral"
            value={opponent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOpponent(e.target.value)
            }
          />

          {error && (
            <div className="rounded-lg shadow-lg alert outline outline-3 outline-error bg-error/25">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <select
            className="w-full max-w-xs select bg-neutral"
            value={numSets}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setNumSets(parseInt(e.target.value))
            }
          >
            <option value="DEFAULT" disabled>
              Choose the number of sets you want
            </option>
            <option value="3">Best 2/3 sets</option>
            <option value="5">Best 3/5 sets</option>
            <option value="1">1 set</option>
          </select>

          <select className="w-full max-w-xs select bg-neutral">
            <option value="DEFAULT" disabled>
              Number of games in each set
            </option>
            <option value="6">Sets up to 6 games</option>
            <option value="4">Sets up to 4 games</option>
            <option value="8">Sets up to 8 games</option>
          </select>

          <div>
            <label className="cursor-pointer label">
              <span className="label-text">Play with sudden death?</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={suddenDeath}
                onChange={() => setSuddenDeath(!suddenDeath)}
              />
            </label>

            <label className="cursor-pointer label">
              <span className="label-text">Tiebreak for final set?</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={tiebreak}
                onChange={() => setTiebreak(!tiebreak)}
              />
            </label>

            <label className="cursor-pointer label">
              <span className="label-text">Are you serving first?</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={serving}
                onChange={() => setServing(!serving)}
              />
            </label>
          </div>

          <select
            className="w-full max-w-xs select bg-neutral"
            value={trackingMode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTrackingMode(e.target.value)
            }
          >
            <option value="DEFAULT" disabled>
              What tennis aspect do you want to focus on?
            </option>
            <option value="starting">
              Starting the point stronger (serves and returns)
            </option>
            <option value="rallying">Controlling the point (rallying)</option>
            <option value="mentality">
              Staying focused and gaining momentum (mentality)
            </option>
          </select>

          <button
            type="submit"
            className={`btn btn-accent btn-sm ${isLoading ? 'loading' : ''}`}
          >
            Start
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchForm;

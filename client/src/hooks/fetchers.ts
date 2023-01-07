import { useEffect, useState } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from './reduxHooks';
import { IMatchAllResponse, IMatch } from '../utils/interfaces';
import {
  getOngoingMatches,
  getFinishedMatches,
  getTrackedMatch,
} from '../redux/matches';

// fetches all matches, dispatches actions, gives loading and error states
export const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [empty, setEmpty] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMatches = async () => {
      // check if user exists
      if (user) {
        try {
          setLoading(true);
          const { data } = await axios.get<IMatchAllResponse>(url, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          dispatch(getOngoingMatches(data.ongoingMatches));
          dispatch(getFinishedMatches(data.finishedMatches));

          if (data.ongoingMatches.length + data.finishedMatches.length === 0)
            setEmpty(true);
        } catch (error) {
          setLoading(false);
          if (axios.isAxiosError(error)) setError(error.message);
          else setError('Unexpected error');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMatches();
  }, [user, url]);

  return { loading, error, empty };
};

// custom hook to fetch just one match
export const useFetchOne = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [empty, setEmpty] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMatches = async () => {
      // check if user exists
      if (user) {
        try {
          setLoading(true);
          const { data } = await axios.get<IMatch>(url, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          dispatch(getTrackedMatch(data));

          if (Object.keys(data).length === 0) setEmpty(true);
        } catch (error) {
          setLoading(false);
          if (axios.isAxiosError(error)) setError(error.message);
          else setError('Unexpected error');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMatches();
  }, [user, url]);

  return { loading, error, empty };
};

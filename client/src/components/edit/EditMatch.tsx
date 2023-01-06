import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditForm from './EditForm';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { getTrackedMatch } from '../../redux/matches';

// edit a match with a specific id
export default function EditMatch() {
  // find the id
  const { id } = useParams();
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMatch = async () => {
      // make sure there is user
      if (user) {
        const response = await fetch(
          `http://localhost:4000/api/matches/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        dispatch(getTrackedMatch(data));
      }
    };

    fetchMatch();
  }, [user]); // refire when user changes

  return (
    <div>
      <h1>Edit match</h1>
      <EditForm match={match} user={user!} />
    </div>
  );
}

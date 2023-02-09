import { FC, useState } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { trackMatch } from '../../redux/matches';
import matchLogic from '../../utils/matchLogic';

import Timer from './Timer';
import PointWonStage from '../stages/mentality/PointWonStage';
import MentalReactionStage from '../stages/mentality/MentalReactionStage';
import PointNotesStage from '../stages/mentality/PointNotesStage';

const TrackMentality: FC = () => {
  // match duration counter
  const [duration, setDuration] = useState<number>(0);

  // point stages variables
  const [wonStage, setWonStage] = useState<boolean>(true);
  const [userReactionStage, setUserReactionStage] = useState<boolean>(false);
  const [opponentReactionStage, setOpponentReactionStage] =
    useState<boolean>(false);
  const [notesStage, setNotesStage] = useState<boolean>(false);

  // point value variables
  const [pointWon, setPointWon] = useState<boolean>(false);
  const [userReaction, setUserReaction] = useState<string>('');
  const [opponentReaction, setOpponentReaction] = useState<string>('');

  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // handle whether point was won or lost
  const handlePointWon = (won: boolean) => {
    // update pointWon state
    setPointWon(won);

    // go to next stage
    setWonStage(false);
    setUserReactionStage(true);
  };

  // handle user and opponent mental reactions
  const handleMentalReaction = (user: boolean, reaction: string) => {
    // checking if user or opponent
    if (user) {
      // updating user reaction state
      setUserReaction(reaction);
      // going to opponent stage
      setUserReactionStage(false);
      setOpponentReactionStage(true);
    } else {
      // updating opponent reaction state
      setOpponentReaction(reaction);
      // going to pointNotesStage
      setOpponentReactionStage(false);
      setNotesStage(true);
    }
  };

  // handle point notes
  const handlePointNotes = (skipped: boolean, note: string) => {
    //
    if (!skipped && note !== '') {
      // call point finished function with note
      handlePointFinished(pointWon, userReaction, opponentReaction, note);
    } else {
      // call point finished function without note
      handlePointFinished(pointWon, userReaction, opponentReaction);
    }
  };

  // handle when point is finished
  const handlePointFinished = async (
    pointWon: boolean,
    userReaction: string,
    opponentReaction: string,
    note?: string
  ) => {
    // update local state
    dispatch(
      trackMatch({
        pointWon,
        match,
        duration,
        side: match.side,
      })
    );

    // send request to db
    if (user) {
      await axios.patch(
        `http://localhost:4000/api/matches/${match.id}`,
        matchLogic(
          pointWon,
          match,
          duration,
          false,
          'double',
          match.side!,
          'net',
          'ace',
          'ace',
          'serve',
          'winner',
          'user',
          userReaction,
          opponentReaction,
          `${note && note}`
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }

    // reset for next point
    setNotesStage(false);
    setWonStage(true);
  };

  return (
    <div>
      <Timer match={match} duration={duration} setDuration={setDuration} />
      {wonStage ? (
        <PointWonStage
          match={match}
          user={user!}
          handlePointWon={handlePointWon}
        />
      ) : (
        <>
          {userReactionStage ? (
            <MentalReactionStage
              user={true}
              userName={user!.name}
              opponentName={match.opponent}
              handleMentalReaction={handleMentalReaction}
            />
          ) : (
            <>
              {opponentReactionStage ? (
                <MentalReactionStage
                  user={false}
                  userName={user!.name}
                  opponentName={match.opponent}
                  handleMentalReaction={handleMentalReaction}
                />
              ) : (
                <>
                  {notesStage ? (
                    <PointNotesStage handlePointNotes={handlePointNotes} />
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
  );
};

export default TrackMentality;

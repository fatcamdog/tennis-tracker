import { FC, useState } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';

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

  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  // handle whether point was won or lost
  const handlePointWon = (won: boolean) => {
    // update pointWon state
    setPointWon(won);

    // go to next stage
    setWonStage(false);
    setUserReactionStage(true);
  };

  // handle user and opponent mental reactions
  const handleMentalReaction = (reaction: string) => {
    console.log(reaction);
  };

  const handlePointFinished = () => {};

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
            <MentalReactionStage />
          ) : (
            <>
              {opponentReactionStage ? (
                <MentalReactionStage />
              ) : (
                <>
                  {notesStage ? (
                    <PointNotesStage />
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

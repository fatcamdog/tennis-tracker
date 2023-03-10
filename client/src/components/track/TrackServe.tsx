import { FC, useState } from 'react';
import axios from 'axios';

import { IMatchUserProps } from '../../utils/interfaces';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { trackMatch } from '../../redux/matches';
import matchLogic from '../../utils/matchLogic';

import Timer from './Timer';
import { ExactServeCourt, ExactRallyCourt } from '../court/ExactCourt';
import ReturnedStage from '../stages/starting/ReturnedStage';
import StrokeStage from '../stages/starting/StrokeStage';
import PointWonStage from '../stages/starting/PointWonStage';

const TrackServe: FC<IMatchUserProps> = ({ match, user }) => {
  // shot data
  const [firstServeLocation, setFirstServeLocation] = useState<string>('');
  const [secondServeLocation, setSecondServeLocation] =
    useState<string>('bypass');
  const [serveFault, setServeFault] = useState<string>('first');
  const [shotReturned, setShotReturned] = useState<boolean>(true);
  const [returnLocation, setReturnLocation] = useState<string>('');
  const [shotStroke, setShotStroke] = useState<string>('');
  const [pointWon, setPointWon] = useState<boolean>(false);
  const [inPlay, setInPlay] = useState<boolean>(true);

  // form stages
  const [serveLocationStage, setServeLocationStage] = useState<boolean>(true);
  const [returnedStage, setReturnedStage] = useState<boolean>(false);
  const [returnLocationStage, setReturnLocationStage] =
    useState<boolean>(false);
  const [strokeStage, setStrokeStage] = useState<boolean>(false);
  const [pointWonStage, setPointWonStage] = useState<boolean>(false);

  // tracking length of match
  const [duration, setDuration] = useState<number>(0);

  const dispatch = useAppDispatch();

  // handle when the user clicks a spot for their serve
  const handleServeLocation = (location: string, inPlay: boolean) => {
    // check if serve went in
    if (!inPlay) {
      if (serveFault === 'first') {
        // first serve -> second serve
        setServeFault('second');

        // update serve location
        setFirstServeLocation(location);
      } else {
        // second serve -> double fault
        setServeFault('double');

        // update serve location
        setSecondServeLocation(location);

        // point finished after double fault
        return handlePointFinish(
          !match.serving,
          'double',
          firstServeLocation,
          location,
          false,
          'bypass',
          'double'
        );
      }
    } else {
      // serve goes in
      if (serveFault === 'first') {
        setFirstServeLocation(location);
      } else {
        setSecondServeLocation(location);
      }

      // hide location stage and show unreturned stage
      setServeLocationStage(false);
      setReturnedStage(true);
    }
  };

  const handleShotReturned = (returned: boolean) => {
    // update returned state
    setShotReturned(returned);

    // hide returned stage and show stroke stage or return location stage
    setReturnedStage(false);
    setReturnLocationStage(true);
  };

  const handleReturnLocation = (location: string, inPlay: boolean) => {
    // update return locaton stat and in play state
    setReturnLocation(location);
    setInPlay(inPlay);

    if (location === 'ace') {
      return handlePointFinish(
        match.serving,
        serveFault,
        firstServeLocation,
        secondServeLocation,
        false,
        'ace',
        'ace'
      );
    }

    // hide return location stage and show stroke location stage
    setReturnLocationStage(false);
    setStrokeStage(true);
  };

  const handleShotStroke = (stroke: string) => {
    // skip point won stage if serve was unreturned
    if (!shotReturned) {
      handlePointFinish(
        match.serving,
        serveFault,
        firstServeLocation,
        secondServeLocation,
        shotReturned,
        returnLocation,
        stroke
      );
    }

    // update stroke stage
    setShotStroke(stroke);

    // hide stroke stage and show point won stage
    setStrokeStage(false);
    setPointWonStage(true);
  };

  const handlePointWon = (won: boolean) => {
    // update point won state
    setPointWon(won);

    // call finish point function
    handlePointFinish(
      won,
      serveFault,
      firstServeLocation,
      secondServeLocation,
      shotReturned,
      returnLocation,
      shotStroke
    );
  };

  // called when point is finished
  const handlePointFinish = async (
    won: boolean,
    fault: string,
    firstServeLocation: string,
    secondServeLocation: string,
    returned: boolean,
    returnLocation: string,
    stroke: string
  ) => {
    // update local state
    dispatch(trackMatch({ pointWon: won, match, duration, side: match.side }));

    // update db
    if (user) {
      await axios.patch(
        `http://localhost:4000/api/matches/${match.id}`,
        matchLogic(
          won,
          match,
          duration,
          returned,
          fault,
          match.side!,
          returnLocation,
          firstServeLocation,
          secondServeLocation,
          stroke,
          'winner',
          'user',
          '',
          '',
          ''
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
    setPointWonStage(false);
    setServeLocationStage(true);
    setSecondServeLocation('bypass');
    setServeFault('first');
  };

  return (
    <div>
      <Timer match={match} duration={duration} setDuration={setDuration} />
      {serveLocationStage ? (
        <>
          {match.side === 'deuce' ? (
            <ExactServeCourt
              handleServeLocation={handleServeLocation}
              side="deuce"
            />
          ) : (
            <ExactServeCourt
              handleServeLocation={handleServeLocation}
              side="ad"
            />
          )}
        </>
      ) : (
        <>
          {returnedStage ? (
            <ReturnedStage handleShotReturned={handleShotReturned} />
          ) : (
            <>
              {returnLocationStage && shotReturned ? (
                <ExactRallyCourt handleShotLocation={handleReturnLocation} />
              ) : (
                <>
                  {returnLocationStage && !shotReturned ? (
                    <ExactRallyCourt
                      handleShotLocation={handleReturnLocation}
                    />
                  ) : (
                    <>
                      {strokeStage ? (
                        <StrokeStage
                          handleShotStroke={handleShotStroke}
                          shotReturned={shotReturned}
                        />
                      ) : (
                        <>
                          {pointWonStage ? (
                            <PointWonStage
                              handlePointWon={handlePointWon}
                              match={match}
                              user={user!}
                            />
                          ) : (
                            <div>Something went wrong</div>
                          )}
                        </>
                      )}
                    </>
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

export default TrackServe;

import { FC, useState } from 'react';
import axios from 'axios';

import { IMatchUserProps } from '../../utils/interfaces';

import Timer from './Timer';
import { DeuceSide, AdSide } from '../court/ServeCourt';
import ReturnedStage from '../stages/starting/ReturnedStage';
import StrokeStage from '../stages/starting/StrokeStage';
import PointWonStage from '../stages/starting/PointWonStage';

const TrackServe: FC<IMatchUserProps> = ({ match, user }) => {
  // shot data
  const [firstServeLocation, setFirstServeLocation] = useState<string>('');
  const [secondServeLocation, setSecondServeLocation] = useState<string>('');
  const [serveFault, setServeFault] = useState<string>('first');
  const [shotReturned, setShotReturned] = useState<boolean>(true);
  const [shotStroke, setShotStroke] = useState<string>('');
  const [pointWon, setPointWon] = useState<boolean>(false);

  // form stages
  const [serveLocationStage, setServeLocationStage] = useState<boolean>(true);
  const [returnedStage, setReturnedStage] = useState<boolean>(false);
  const [strokeStage, setStrokeStage] = useState<boolean>(false);
  const [pointWonStage, setPointWonStage] = useState<boolean>(false);

  // tracking length of match
  const [duration, setDuration] = useState<number>(0);

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

        // TODO reflect point changes
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

    // hide returned stage and show stroke stage
    setReturnedStage(false);
    setStrokeStage(true);
  };

  const handleShotStroke = (stroke: string) => {
    // TODO only show ace option if unreturned is true

    // update stroke stage
    setShotStroke(stroke);

    // hide stroke stage and sow point won stage
    setStrokeStage(false);
    setPointWonStage(true);
  };

  const handlePointWon = (won: boolean) => {
    // update point won state
    setPointWon(won);

    // call finish point function
    handlePointFinish();
  };

  const handlePointFinish = () => {
    console.log('point over');
  };

  return (
    <div>
      <Timer match={match} duration={duration} setDuration={setDuration} />
      {serveLocationStage ? (
        <>
          {match.side === 'deuce' ? (
            <DeuceSide handleServeLocation={handleServeLocation} />
          ) : (
            <AdSide handleServeLocation={handleServeLocation} />
          )}
        </>
      ) : (
        <>
          {returnedStage ? (
            <ReturnedStage handleShotReturned={handleShotReturned} />
          ) : (
            <>
              {strokeStage ? (
                <StrokeStage handleShotStroke={handleShotStroke} />
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
    </div>
  );
};

export default TrackServe;

// Court diagram - serve if serving - return if returning
// Returned stage
// Forehand, backhand, or ace
// Won or lost

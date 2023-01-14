import { FC, useState } from 'react';
import axios from 'axios';

import { IMatchUserProps } from '../../utils/interfaces';

import { DeuceSide, AdSide } from '../court/ServeCourt';
import Timer from './Timer';

const TrackServe: FC<IMatchUserProps> = ({ match, user }) => {
  // shot data
  const [firstServeLocation, setFirstServeLocation] = useState<string>('');
  const [secondServeLocation, setSecondServeLocation] = useState<string>('');
  const [serveFault, setServeFault] = useState<string>('first');
  const [returned, setReturned] = useState<boolean>(true);

  // form stages
  const [serveLocationStage, setServeLocationStage] = useState<boolean>(true);

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
        console.log('first serve goes: ' + location);
      } else {
        // second serve -> double fault
        setServeFault('double');

        // update serve location
        setSecondServeLocation(location);
        console.log('second serve goes: ' + location);

        // reflect point changes
      }
    } else {
      // serve goes in
      if (serveFault === 'first') {
        setFirstServeLocation(location);
        console.log('first serve goes: ' + location);
      } else {
        setSecondServeLocation(location);
        console.log('second serve goes: ' + location);
      }

      // hide location stage and show unreturned stage
      setServeLocationStage(false);
    }
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
        <div>Next stage</div>
      )}
    </div>
  );
};

export default TrackServe;

// Court diagram - serve if serving - return if returning
// Returned stage
// Forehand, backhand, or ace
// Won or lost

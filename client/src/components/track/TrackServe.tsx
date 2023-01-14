import { FC, useState } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

import { DeuceSide, AdSide } from '../court/ServeCourt';
import Timer from './Timer';

const TrackServe: FC<IMatchUserProps> = ({ match, user }) => {
  // point data and shots
  const [firstServeLocation, setFirstServeLocation] = useState<string>('');
  const [secondServeLocation, setSecondServeLocation] = useState<string>('');

  // form stages
  const [serveLocationStage, setServeLocationStage] = useState<boolean>(true);

  // tracking length of match
  const [duration, setDuration] = useState<number>(0);

  // handle when the user clicks a spot for their serve
  const handleServeLocation = (location: string, inPlay: boolean) => {
    console.log(location, inPlay);
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
// Unreturned or returned
// Forehand, backhand, or ace
// Won or lost

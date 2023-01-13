import { FC, useState } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

import { DeuceSide, AdSide } from '../court/ServeCourt';
import Timer from './Timer';

const TrackServe: FC<IMatchUserProps> = ({ match, user }) => {
  const [duration, setDuration] = useState<number>(0);

  return (
    <div>
      <Timer match={match} duration={duration} setDuration={setDuration} />
      <DeuceSide />
      <AdSide />
    </div>
  );
};

export default TrackServe;

// Court diagram - serve if serving - return if returning
// Unreturned or returned
// Forehand, backhand, or ace
// Won or lost

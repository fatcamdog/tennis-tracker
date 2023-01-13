import { DeuceSide, AdSide } from '../court/ServeCourt';

const TrackServe = () => {
  return (
    <div>
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

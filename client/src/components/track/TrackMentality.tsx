import { FC, useState } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';

import Timer from './Timer';
import PointWonStage from '../stages/mentality/PointWonStage';
import MentalReactionStage from '../stages/mentality/MentalReactionStage';
import PointNotesStage from '../stages/mentality/PointsNotesStage';

const TrackMentality: FC = () => {
  const [duration, setDuration] = useState<number>(0);

  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Timer match={match} duration={duration} setDuration={setDuration} />
      <PointWonStage />
      <MentalReactionStage />
      <PointNotesStage />
    </div>
  );
};

export default TrackMentality;

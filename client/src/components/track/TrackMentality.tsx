import { FC, useState } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';
import { useAppSelector } from '../../hooks/reduxHooks';

import Timer from './Timer';

const TrackMentality: FC = () => {
  const [duration, setDuration] = useState<number>(0);

  const { match } = useAppSelector((state) => state.matches);

  return (
    <div>
      <Timer match={match} duration={duration} setDuration={setDuration} />
    </div>
  );
};

export default TrackMentality;

import { FC, useState } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';
import { useAppSelector } from '../../hooks/reduxHooks';

import Timer from './Timer';

const TrackMentality: FC = () => {
  const [duration, setDuration] = useState<number>(0);

  const { match } = useAppSelector((state) => state.matches);
  console.log(match);

  return <div>Tracking mentality</div>;
};

export default TrackMentality;

import { FC } from 'react';

import { IMatchUserStatsProps } from '../../utils/interfaces';

export const DeuceStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  return <div>Deuce stats</div>;
};

export const AdStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  return <div>Ad stats</div>;
};

export const ReturnStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  return <div>Return stats</div>;
};

import { FC } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

import { DeuceStats, AdStats, ReturnStats } from '../court/CourtStats';

export const ServeDiagramAnalytics: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <div>
      <div>
        <p>{user.name}</p>
      </div>
      <br />
      <div>
        <p>{match.opponent}</p>
        <div></div>
      </div>
    </div>
  );
};

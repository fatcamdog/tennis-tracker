import { FC } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

import { DeuceStats, AdStats, ReturnStats } from '../court/CourtStats';

export const ServeDiagramAnalytics: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <div>
      <div>
        <p>{user.name}</p>
        <div>
          <DeuceStats match={match} user={true} />
          <AdStats match={match} user={true} />
          <ReturnStats match={match} user={true} />
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}</p>
        <div>
          <DeuceStats match={match} user={false} />
          <AdStats match={match} user={false} />
          <ReturnStats match={match} user={false} />
        </div>
      </div>
    </div>
  );
};

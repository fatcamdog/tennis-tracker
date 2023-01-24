import { FC } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

import { DeuceStats, AdStats, ReturnStats } from '../court/CourtStats';

export const ServeDiagramAnalytics: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <div>
      <div>
        <p>{user.name}</p>
        <div>
          <div>
            <p>Deuce Side Stats</p>
            <DeuceStats match={match} user={true} />
          </div>
          <div>
            <p>Ad Side Stats</p>
            <AdStats match={match} user={true} />
          </div>
          <div>
            <p>Return Stats</p>
            <ReturnStats match={match} user={true} />
          </div>
        </div>
      </div>
      <br />
      <div>
        <p>{match.opponent}</p>
        <div>
          <div>
            <p>Deuce Side Stats</p>
            <DeuceStats match={match} user={false} />
          </div>
          <div>
            <p>Ad Side Stats</p>
            <AdStats match={match} user={false} />
          </div>
          <div>
            <p>Return Stats</p>
            <ReturnStats match={match} user={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
import { FC } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';

import { RallyCourtStats } from '../court/CourtStats';
import { ExactServeStats, ExactRallyStats } from '../court/ExactCourtStats';
import PlusMinus from '../court/PlusMinus';

export const ServeDiagramAnalytics = () => {
  const { match } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <div>
        <p>{user?.name}</p>
        <div>
          {/* <div>
            <p>Deuce Side Stats</p>
            <ExactServeStats user={true} side="deuce" />
          </div>
          <div>
            <p>Ad Side Stats</p>
            <ExactServeStats user={true} side="ad" />
          </div> */}
          <div>
            <p>Return Stats</p>
            <ExactRallyStats user={true} />
          </div>
        </div>
      </div>
      <br />
      {/* <div>
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
      </div> */}
    </div>
  );
};

export const ReturnDiagramAnalytics: FC = () => {
  return (
    <>
      <PlusMinus />
      <br />
      <RallyCourtStats user={'user'} />
      <br />
      <RallyCourtStats user={'opponent'} />
    </>
  );
};

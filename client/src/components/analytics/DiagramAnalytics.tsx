import { FC } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

export const ServeDiagramAnalytics: FC<IMatchUserProps> = ({ match, user }) => {
  return (
    <div>
      <div>
        <p>{user.name}</p>
        <div></div>
      </div>
      <br />
      <div>
        <p>{match.opponent}</p>
        <div></div>
      </div>
    </div>
  );
};

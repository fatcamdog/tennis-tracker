import { FC } from 'react';

import { IHandleUserReactionProps } from '../../../utils/interfaces';

const MentalReactionStage: FC<IHandleUserReactionProps> = ({
  user,
  userName,
  opponentName,
  handleMentalReaction,
}) => {
  return (
    <div>
      <p>
        What was the reaction of {user ? userName : opponentName} to the point?
      </p>
      <div>
        <button className="btn btn-accent">They had no reaction</button>
        <button className="btn btn-accent">They shouted positively</button>
        <button className="btn btn-accent">They shouted negatively</button>
        <button className="btn btn-accent">They fist-pumped</button>
        <button className="btn btn-accent">They threw their racket</button>
        <button className="btn btn-accent">They hit their racket</button>
        <button className="btn btn-accent">Other</button>
      </div>
    </div>
  );
};

export default MentalReactionStage;

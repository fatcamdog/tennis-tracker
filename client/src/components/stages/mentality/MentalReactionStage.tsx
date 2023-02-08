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
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'none')}
        >
          They had no reaction
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'shout_positive')}
        >
          They shouted positively
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'shout_negative')}
        >
          They shouted negatively
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'fist_pump')}
        >
          They fist-pumped
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'throw')}
        >
          They threw their racket
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'hit')}
        >
          They hit their racket
        </button>
        <button
          className="btn btn-accent"
          onClick={() => handleMentalReaction(user, 'other')}
        >
          Other
        </button>
      </div>
    </div>
  );
};

export default MentalReactionStage;

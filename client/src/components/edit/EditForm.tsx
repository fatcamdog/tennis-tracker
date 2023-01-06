import React, { FC, useState, useEffect } from 'react';

import { IMatchUserProps, IMatch } from '../../utils/interfaces';

const EditForm: FC<IMatchUserProps> = ({ match, user }) => {
  const [matchInput, setMatchInput] = useState<IMatch>(match);

  useEffect(() => {
    setMatchInput(match);
  }, [match]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (user) {
      await fetch(`http://localhost:4000/api/matches/edit/${match.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(matchInput),
      });
    }
  };

  const handleDelete = async () => {
    if (user) {
      await fetch(`http://localhost:4000/api/matches/${match.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Opponent:
        <input
          type="text"
          value={matchInput.opponent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMatchInput({ ...matchInput, opponent: e.currentTarget.value })
          }
        />
        <br />
        User sets:
        <input
          type="number"
          value={matchInput.userSets}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMatchInput({
              ...matchInput,
              userSets: parseInt(e.currentTarget.value),
            })
          }
        />
        <br />
        Opp sets:
        <input
          type="number"
          value={matchInput.oppSets}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMatchInput({
              ...matchInput,
              oppSets: parseInt(e.currentTarget.value),
            })
          }
        />
        <br />
        <div>
          User games:
          {matchInput.userGames.map((game, index) => (
            <div key={`user-${index}`}>
              <input
                type="number"
                value={game}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMatchInput({
                    ...matchInput,
                    userGames: matchInput.userGames.map((game, i) => {
                      if (index === i) return parseInt(e.currentTarget.value);
                      else return game;
                    }),
                  })
                }
              />
              <br />
            </div>
          ))}
        </div>
        <br />
        <div>
          Opp games:
          {matchInput.oppGames.map((game, index) => (
            <div key={`opp-${index}`}>
              <input
                type="number"
                value={game}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMatchInput({
                    ...matchInput,
                    oppGames: matchInput.oppGames.map((game, i) => {
                      if (index === i) return parseInt(e.currentTarget.value);
                      else return game;
                    }),
                  })
                }
              />
              <br />
            </div>
          ))}
        </div>
        <button type="submit">Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <p>
          Note: if you change values other than the opponent's name, it will
          affect the point analytics and incorrectly align points won and lost
          to the set and game values.
        </p>
      </form>
    </div>
  );
};

export default EditForm;

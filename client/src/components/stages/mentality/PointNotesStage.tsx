import { FC, useState, FormEvent } from 'react';

import { IHandlePointNoteProps } from '../../../utils/interfaces';

const PointNotesStage: FC<IHandlePointNoteProps> = ({ handlePointNotes }) => {
  const [note, setNote] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePointNotes(false, note);
  };

  return (
    <div>
      <p>Is there any additional info you would like to add?</p>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="btn btn-accent">
            Add
          </button>
        </form>
        <button
          className="btn btn-accent"
          onClick={() => handlePointNotes(true, '')}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default PointNotesStage;

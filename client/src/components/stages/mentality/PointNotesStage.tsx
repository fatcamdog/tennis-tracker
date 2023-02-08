import { FC, useState } from 'react';

const PointNotesStage: FC = () => {
  const [note, setNote] = useState<string>('');

  const handleSubmit = () => {};

  return (
    <div>
      <p>Is there any additional info you would like to add?</p>
      <div>
        <form>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="btn btn-accent">
            Add
          </button>
        </form>
        <button className="btn btn-accent">Skip</button>
      </div>
    </div>
  );
};

export default PointNotesStage;

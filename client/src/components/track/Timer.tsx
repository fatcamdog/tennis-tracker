import { FC, useState, useEffect } from 'react';

import { IMatchDurationProps } from '../../utils/interfaces';

const Timer: FC<IMatchDurationProps> = ({ match, duration, setDuration }) => {
  const [running, setRunning] = useState(true);

  // get the current match duration
  useEffect(() => {
    setDuration(match.duration);
  }, [match]);

  // increment every minute
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setDuration((prevTime: any) => prevTime + 1);
      }, 60000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h1>Timer</h1>
      <p>{duration}</p>
      <div>
        {running ? (
          <button className="btn btn-accent" onClick={() => setRunning(false)}>
            Pause Timer
          </button>
        ) : (
          <button className="btn btn-accent" onClick={() => setRunning(true)}>
            Resume Timer
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;

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
      <p>Timer part</p>
      <div>{duration}</div>
      <div>
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setDuration(0)}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;

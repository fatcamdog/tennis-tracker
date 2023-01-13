import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import matchLogic from '../../utils/matchLogic';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { trackMatch } from '../../redux/matches';
import { IMatchUserProps } from '../../utils/interfaces';

// TODO add forst serve and second serve fields
// Form to input data about serve and return of a point
const TrackServe: FC<IMatchUserProps> = ({ match, user }) => {
  const [duration, setDuration] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(true);

  const [locationStage, setLocationStage] = useState<boolean>(true);
  const [location, setLocation] = useState<string>('');
  const [fault, setFault] = useState<string>('first');
  const [returnStage, setReturnStage] = useState<boolean>(false);
  const [unreturned, setUnreturned] = useState<boolean>(false);
  const [strokeStage, setStrokeStage] = useState<boolean>(false);
  const [stroke, setStroke] = useState<string>('');
  const [wonStage, setWonStage] = useState<boolean>(false);
  const [faultStage, setFaultStage] = useState<boolean>(false);
  const [pointWon, setPointWon] = useState<boolean>(true);
  const [returnerReturned, setReturnerReturned] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  // get the current match duration
  useEffect(() => {
    setDuration(match.duration);
  }, [match]);

  // increment every minute
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setDuration((prevTime) => prevTime + 1);
      }, 60000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  // handle when the location is chosen
  const handleShotLocation = async (location: string, inPlay: boolean) => {
    if (match.serving) {
      if (!inPlay) {
        if (fault === 'first') {
          setFault('second');
        } else {
          if (user) {
            dispatch(
              trackMatch({
                pointWon: false,
                match,
                duration,
                unreturned,
                fault: 'double',
                side: match.side,
                location,
                stroke: 'double',
              })
            );
            await axios.patch(
              `http://localhost:4000/api/matches/${match.id}`,
              matchLogic(
                false,
                match,
                duration,
                unreturned,
                'double',
                match.side!,
                location,
                'double',
                'ace',
                'user'
              ),
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
          }

          setLocation('');
          setFault('first');
          setUnreturned(false);
          setStroke('');
        }
      } else {
        setLocationStage(false);
        setReturnStage(true);
        setLocation(location);
      }
    } else {
      if (location === 'ace') {
        if (user) {
          dispatch(
            trackMatch({
              pointWon: false,
              match,
              duration,
              unreturned: true,
              fault: 'first',
              side: match.side,
              location,
              stroke: 'ace',
            })
          );
          await axios.patch(
            `http://localhost:4000/api/matches/${match.id}`,
            matchLogic(
              false,
              match,
              duration,
              true,
              'first',
              match.side!,
              location,
              'ace',
              'ace',
              'user'
            ),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
        }

        setLocation('');
        setFault('first');
        setUnreturned(false);
        setStroke('');
      } else if (location === 'double') {
        if (user) {
          dispatch(
            trackMatch({
              pointWon: true,
              match,
              duration,
              unreturned,
              fault: 'double',
              side: match.side,
              location,
              stroke: 'double',
            })
          );
          await axios.patch(
            `http://localhost:4000/api/matches/${match.id}`,
            matchLogic(
              true,
              match,
              duration,
              unreturned,
              'double',
              match.side!,
              location,
              'double',
              'ace',
              'user'
            ),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
        }

        setLocation('');
        setFault('first');
        setUnreturned(false);
        setStroke('');
      } else {
        if (!inPlay) setPointWon(false);
        setLocationStage(false);
        setFaultStage(true);
        setLocation(location);
        setUnreturned(!inPlay);
      }
    }
  };

  // handle wether first or second serve
  const handleServeFault = (fault: string) => {
    setFaultStage(false);
    setStrokeStage(true);
    setFault(fault);
  };

  // handle wether the returner returns the serve
  const handleServeReturned = (unreturned: boolean) => {
    setReturnStage(false);
    setStrokeStage(true);
    setUnreturned(unreturned!);
    if (unreturned) setReturnerReturned(false);
  };

  // handle which stroke the returner hit or if ace
  const handleReturnStroke = async (stroke: string) => {
    if (!pointWon) {
      setLocationStage(true);
      setStrokeStage(false);

      if (user) {
        dispatch(
          trackMatch({
            pointWon: false,
            match,
            duration,
            unreturned,
            fault,
            side: match.side,
            location,
            stroke,
          })
        );
        await axios.patch(
          `http://localhost:4000/api/matches/${match.id}`,
          matchLogic(
            false,
            match,
            duration,
            unreturned,
            fault,
            match.side!,
            location,
            stroke,
            'ace',
            'user'
          ),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      }

      setLocation('');
      setFault('first');
      setUnreturned(false);
      setStroke('');
      setPointWon(true);
    } else if (!returnerReturned) {
      if (user) {
        dispatch(
          trackMatch({
            pointWon: true,
            match,
            duration,
            unreturned,
            fault,
            side: match.side,
            location,
            stroke,
          })
        );
        await axios.patch(
          `http://localhost:4000/api/matches/${match.id}`,
          matchLogic(
            true,
            match,
            duration,
            unreturned,
            fault,
            match.side!,
            location,
            stroke,
            'ace',
            'user'
          ),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      }

      setStrokeStage(false);
      setLocationStage(true);
      setLocation('');
      setFault('first');
      setUnreturned(false);
      setStroke('');
      setPointWon(true);
      setReturnerReturned(true);
    } else {
      setStrokeStage(false);
      setWonStage(true);
      setStroke(stroke);
    }
  };

  // handle wether user or opponent won the point
  const handlePointWon = (won: boolean) => {
    setWonStage(false);
    setLocationStage(true);
    handlePointFinish(won);
  };

  // send patch request to server and update global state
  const handlePointFinish = async (won: boolean) => {
    if (user) {
      dispatch(
        trackMatch({
          pointWon: won,
          match,
          duration,
          unreturned,
          fault,
          side: match.side,
          location,
          stroke,
        })
      );
      await axios.patch(
        `http://localhost:4000/api/matches/${match.id}`,
        matchLogic(
          won,
          match,
          duration,
          unreturned,
          fault,
          match.side!,
          location,
          stroke,
          'ace',
          'user'
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }

    setLocation('');
    setFault('first');
    setUnreturned(false);
    setStroke('');
  };

  return (
    <div>
      <div>
        <p>Timer part</p>
        <div>{duration}</div>
        <div>
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Stop</button>
          <button onClick={() => setDuration(0)}>Reset</button>
        </div>
      </div>
      <div>
        {match.serving ? (
          <div>
            <h3 className="text-xl">{user.name} is serving</h3>
            <p>Side: {match.side}</p>
            <p>Serve: {fault}</p>
            {locationStage ? (
              <div>
                <p>Click where serve landed</p>
                {match.side === 'deuce' ? (
                  <div>
                    <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
                      <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
                        <button
                          onClick={() => handleShotLocation('wide', false)}
                          className={`absolute flex items-center justify-center rounded inset-2 top-1/2 ${
                            fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                        >
                          <p className="-rotate-90">Wide</p>
                        </button>
                      </div>
                      <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind outline outline-2 outline-white">
                        <button
                          onClick={() => handleShotLocation('long', false)}
                          className={`flex items-center justify-center h-12 grow ${
                            fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                        >
                          <p>Long</p>
                        </button>
                      </div>
                      <div className="bg-blue-400"></div>
                      <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
                        <button
                          onClick={() =>
                            handleShotLocation(`serve_wide_deuce`, true)
                          }
                          className="bg-green-500 rounded grow"
                        ></button>
                        <button
                          onClick={() =>
                            handleShotLocation(`serve_middle_deuce`, true)
                          }
                          className="bg-green-500 rounded grow"
                        ></button>
                        <button
                          onClick={() =>
                            handleShotLocation(`serve_tee_deuce`, true)
                          }
                          className="bg-green-500 rounded grow"
                        ></button>
                      </div>
                      <div className="flex p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
                        <button
                          onClick={() => handleShotLocation(`wide`, false)}
                          className={`flex items-center justify-center w-1/3 rounded ${
                            fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                        >
                          <p className="rotate-90">Wide</p>
                        </button>
                      </div>
                      <div className="bg-blue-400 outline outline-2 outline-white grid-in-right-alley"></div>
                    </div>
                    <button
                      onClick={() => handleShotLocation(`net`, false)}
                      className={`h-12 mt-2 rounded grid-in-net ${
                        fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                      }`}
                      style={{ width: '42rem' }}
                    >
                      <p>Net</p>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
                      <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley"></div>
                      <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind"></div>
                      <div className="flex items-end p-2 bg-blue-400 grid-in-right-behind">
                        <button
                          onClick={() => handleShotLocation('long', false)}
                          className={`flex items-center justify-center h-12 rounded grow ${
                            fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                        >
                          <p>Long</p>
                        </button>
                      </div>
                      <div className="flex justify-end p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
                        <button
                          onClick={() => handleShotLocation(`wide`, false)}
                          className={`flex items-center justify-center w-1/3 rounded ${
                            fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                        >
                          <p className="-rotate-90">Wide</p>
                        </button>
                      </div>
                      <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
                        <button
                          onClick={() =>
                            handleShotLocation(`serve_tee_ad`, true)
                          }
                          className="bg-green-500 rounded grow"
                        ></button>
                        <button
                          onClick={() =>
                            handleShotLocation(`serve_middle_ad`, true)
                          }
                          className="bg-green-500 rounded grow"
                        ></button>
                        <button
                          onClick={() =>
                            handleShotLocation(`serve_wide_ad`, true)
                          }
                          className="bg-green-500 rounded grow"
                        ></button>
                      </div>
                      <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
                        <button
                          onClick={() => handleShotLocation('wide', false)}
                          className={`absolute flex items-center justify-center rounded inset-2 top-1/2 ${
                            fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                        >
                          <p className="rotate-90">Wide</p>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleShotLocation(`net`, false)}
                      className={`h-12 mt-2 rounded grid-in-net ${
                        fault === 'first' ? 'bg-orange-400' : 'bg-red-500'
                      }`}
                      style={{ width: '42rem' }}
                    >
                      <p>Net</p>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {returnStage ? (
                  <div>
                    <p>Was the serve returned?</p>
                    <button
                      onClick={() => handleServeReturned(false)}
                      className="btn btn-accent"
                    >
                      Returned
                    </button>
                    <button
                      onClick={() => handleServeReturned(true)}
                      className="btn btn-accent"
                    >
                      Unreturned
                    </button>
                  </div>
                ) : (
                  <div>
                    {strokeStage ? (
                      <div>
                        <p>What stroke did the returner hit?</p>
                        <button
                          onClick={() => handleReturnStroke('forehand')}
                          className="btn btn-accent"
                        >
                          Forehand
                        </button>
                        <button
                          onClick={() => handleReturnStroke('backhand')}
                          className="btn btn-accent"
                        >
                          Backhand
                        </button>
                        {unreturned ? (
                          <button
                            onClick={() => handleReturnStroke('ace')}
                            className="btn btn-accent"
                          >
                            Ace
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div>
                        {wonStage ? (
                          <div>
                            <p>Did you win the point?</p>
                            <button
                              onClick={() => handlePointWon(true)}
                              className="btn btn-accent"
                            >
                              Won
                            </button>
                            <button
                              onClick={() => handlePointWon(false)}
                              className="btn btn-accent"
                            >
                              Lost
                            </button>
                          </div>
                        ) : (
                          <p>
                            random stage that should not be possible to get to
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {locationStage ? (
              <div>
                <p className="text-xl">{match.opponent} is serving</p>
                <p>Side: {match.side}</p>
                <p>Serve: {fault}</p>
                <p>Click where your return went</p>
                <div className="flex items-center gap-2 my-2">
                  <p>or</p>{' '}
                  <button
                    onClick={() => handleShotLocation('ace', false)}
                    className="btn btn-accent btn-sm"
                  >
                    Aced
                  </button>
                  <p>or</p>
                  <button
                    onClick={() => handleShotLocation('double', false)}
                    className="btn btn-accent btn-sm"
                  >
                    Double fault
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleShotLocation('long', false)}
                    className="h-12 mb-2 bg-red-500 rounded"
                    style={{ width: '42rem' }}
                  >
                    <p>Long</p>
                  </button>
                  <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
                    <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
                      <button
                        onClick={() => handleShotLocation('wide', false)}
                        className="absolute flex items-center justify-center bg-red-500 rounded inset-2"
                      >
                        <p className="-rotate-90">Wide</p>
                      </button>
                    </div>
                    <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind">
                      <button
                        onClick={() => handleShotLocation('deep_deuce', true)}
                        className="w-2/3 h-full bg-green-500 rounded"
                      ></button>
                      <button
                        onClick={() => handleShotLocation('deep_middle', true)}
                        className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none"
                      ></button>
                    </div>
                    <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind">
                      <button
                        onClick={() => handleShotLocation('deep_middle', true)}
                        className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none"
                      ></button>
                      <button
                        onClick={() => handleShotLocation('deep_ad', true)}
                        className="w-2/3 h-full bg-green-500 rounded"
                      ></button>
                    </div>
                    <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
                      <button
                        onClick={() => handleShotLocation('short_deuce', true)}
                        className="w-2/3 h-full bg-green-500 rounded"
                      ></button>
                      <button
                        onClick={() => handleShotLocation('short_middle', true)}
                        className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none"
                      ></button>
                    </div>
                    <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad">
                      <button
                        onClick={() => handleShotLocation('short_middle', true)}
                        className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none"
                      ></button>
                      <button
                        onClick={() => handleShotLocation('short_ad', true)}
                        className="w-2/3 h-full bg-green-500 rounded"
                      ></button>
                    </div>
                    <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
                      <button
                        onClick={() => handleShotLocation('wide', false)}
                        className="absolute flex items-center justify-center bg-red-500 rounded inset-2"
                      >
                        <p className="rotate-90">Wide</p>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleShotLocation(`net`, false)}
                    className="h-12 mt-2 bg-red-500 rounded grid-in-net"
                    style={{ width: '42rem' }}
                  >
                    <p>Net</p>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {faultStage ? (
                  <div>
                    <p>Did the opponent hit a first serve or a second serve?</p>
                    <button
                      onClick={() => handleServeFault('first')}
                      className="btn btn-accent"
                    >
                      First serve
                    </button>
                    <button
                      onClick={() => handleServeFault('second')}
                      className="btn btn-accent"
                    >
                      Second serve
                    </button>
                  </div>
                ) : (
                  <div>
                    {strokeStage ? (
                      <div>
                        <p>What stroke did you hit for the return?</p>
                        <button
                          onClick={() => handleReturnStroke('forehand')}
                          className="btn btn-accent"
                        >
                          Forehand
                        </button>
                        <button
                          onClick={() => handleReturnStroke('forehand')}
                          className="btn btn-accent"
                        >
                          Backhand
                        </button>
                      </div>
                    ) : (
                      <div>
                        {wonStage ? (
                          <div>
                            <p>Did you win the point?</p>
                            <button
                              onClick={() => handlePointWon(true)}
                              className="btn btn-accent"
                            >
                              Won
                            </button>
                            <button
                              onClick={() => handlePointWon(false)}
                              className="btn btn-accent"
                            >
                              Lost
                            </button>
                          </div>
                        ) : (
                          <p>hello if u got here</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackServe;

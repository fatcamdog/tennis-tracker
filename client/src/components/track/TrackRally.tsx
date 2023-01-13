import { FC, useState } from 'react';
import axios from 'axios';

import { IMatchUserProps } from '../../utils/interfaces';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { trackMatch } from '../../redux/matches';
import matchLogic from '../../utils/matchLogic';

import RallyCourt from '../court/RallyCourt';
import HitterStage from '../stages/HitterStage';
import MethodStage from '../stages/MethodStage';
import SideStage from '../stages/SideStage';
import TypeStage from '../stages/TypeStage';
import PointWonStage from '../stages/PointWonStage';
import Timer from './Timer';

const TrackRally: FC<IMatchUserProps> = ({ match, user }) => {
  const [shotLocation, setShotLocation] = useState<string>('');
  const [shotHitter, setShotHitter] = useState<string>('');
  const [shotMethod, setShotMethod] = useState<string>('');
  const [shotSide, setShotSide] = useState<string>('');
  const [shotType, setShotType] = useState<string>('');
  const [pointWon, setPointWon] = useState<boolean>(false);
  // stroke will be combination of side and type -> forehand_groundstroke
  const [shotStroke, setShotStroke] = useState<string>('');
  // chekc if shot was in play or not
  const [shotInPlay, setShotInPlay] = useState<boolean>(true);

  const [locationStage, setLocationStage] = useState<boolean>(true);
  const [hitterStage, setHitterStage] = useState<boolean>(false);
  const [methodStage, setMethodStage] = useState<boolean>(false);
  const [sideStage, setSideStage] = useState<boolean>(false);
  const [typeStage, setTypeStage] = useState<boolean>(false);
  const [pointWonStage, setPointWonStage] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(0);

  const dispatch = useAppDispatch();

  // TODO remove overhead and serve from side

  // TODO remove winner option
  // TODO remove won or lost option

  // handle when the user clicks on the tennis court diagram
  const handleShotLocation = (location: string, inPlay: boolean) => {
    // handle exception -> ace
    if (location === 'ace') {
      return handlePointFinish(
        match.serving,
        'ace',
        `${match.serving ? 'user' : 'opponent'}`,
        'ace',
        'serve'
      );
    }

    // handle exception -> double fault
    if (location === 'double') {
      return handlePointFinish(
        !match.serving,
        'double',
        `${match.serving ? 'user' : 'opponent'}`,
        'double_fault',
        'serve'
      );
    }

    // handle exception -> shot out
    if (!inPlay) {
      setShotInPlay(false);
    }

    // hide location stage and show method stage
    setLocationStage(false);
    setHitterStage(true);

    // update shot location
    setShotLocation(location);
  };

  // handle who hit the shot -> then can deduct stats for other player too
  const handleShotHitter = (hitter: string) => {
    // hide hitter and show method stage
    setHitterStage(false);
    setMethodStage(true);

    // update hitter state
    setShotHitter(hitter);
  };

  // handle the user shot method (winner, foreced error, or unforced error)
  const handleShotMethod = (method: string): void => {
    // hide method stage and show shot side stage
    setMethodStage(false);
    setSideStage(true);

    // update shot method
    setShotMethod(method);
  };

  // handle which side the user hits on (forehand or backhand - exceptions: serve and overhead)
  const handleShotSide = (side: string): void => {
    // hide side stage and show type stage
    setSideStage(false);
    setTypeStage(true);

    // update shot side
    setShotSide(side);
  };

  // handle what type of shot user hit (groundstroke, volley, slice, dropshot, overhead, or serve)
  const handleShotType = (type: string): void => {
    // hide type stage and shown point won stage
    setTypeStage(false);
    setPointWonStage(true);

    // update shot type
    setShotType(type);

    // update shotStroke state
    setShotStroke(updateStroke(shotSide, type));
  };

  const handlePointWon = (won: boolean): void => {
    // update point won
    setPointWon(won);

    // handle end of the point
    handlePointFinish(won, shotLocation, shotHitter, shotMethod, shotStroke);
  };

  // use stroke side and stroke type to create a stroke: backhand and groundstroke -> backhand_groundstroke
  const updateStroke = (side: string, type: string): string => {
    if (
      type !== 'overhead' &&
      type !== 'serve' &&
      side !== 'overhead' &&
      side !== 'serve'
    ) {
      // returns side_type -> forehand_backhand
      return `${side}_${type}`;
    } else {
      // unless it is overhead or serve
      return side;
    }
  };

  const handlePointFinish = async (
    won: boolean,
    location: string,
    hitter: string,
    method: string,
    stroke: string
  ): Promise<void> => {
    // update local state
    dispatch(
      trackMatch({
        pointWon: won,
        match,
        duration,
        side: match.side,
      })
    );

    // send request to database
    if (user) {
      await axios.patch(
        `http://localhost:4000/api/matches/${match.id}`,
        matchLogic(
          won,
          match,
          duration,
          false,
          'double',
          match.side!,
          location,
          stroke,
          method,
          hitter
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }

    // reset
    setPointWonStage(false);
    setLocationStage(true);
  };

  return (
    <div>
      <h1>Tracking rallies</h1>
      <Timer match={match} duration={duration} setDuration={setDuration} />
      {locationStage ? (
        <RallyCourt handleShotLocation={handleShotLocation} />
      ) : (
        <>
          {hitterStage ? (
            <HitterStage
              handleShotHitter={handleShotHitter}
              match={match}
              user={user}
            />
          ) : (
            <>
              {methodStage ? (
                <MethodStage handleShotMethod={handleShotMethod} />
              ) : (
                <>
                  {sideStage ? (
                    <SideStage handleShotSide={handleShotSide} />
                  ) : (
                    <>
                      {typeStage ? (
                        <TypeStage handleShotType={handleShotType} />
                      ) : (
                        <>
                          {pointWonStage ? (
                            <PointWonStage handlePointWon={handlePointWon} />
                          ) : (
                            <div>Something went wrong</div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TrackRally;
import { FC, useState } from 'react';
import axios from 'axios';

import { IMatchUserProps } from '../../utils/interfaces';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { trackMatch } from '../../redux/matches';
import matchLogic from '../../utils/matchLogic';

import RallyCourt from '../court/RallyCourt';
import MethodStage from '../stages/MethodStage';
import SideStage from '../stages/SideStage';
import TypeStage from '../stages/TypeStage';
import PointWonStage from '../stages/PointWonStage';
import Timer from './Timer';

const TrackRally: FC<IMatchUserProps> = ({ match, user }) => {
  const [shotLocation, setShotLocation] = useState<string>('');
  const [shotMethod, setShotMethod] = useState<string>('');
  const [shotSide, setShotSide] = useState<string>('');
  const [shotType, setShotType] = useState<string>('');
  const [pointWon, setPointWon] = useState<boolean>(false);
  // stroke will be combination of side and type -> forehand_groundstroke
  const [shotStroke, setShotStroke] = useState<string>('');

  const [locationStage, setLocationStage] = useState<boolean>(true);
  const [methodStage, setMethodStage] = useState<boolean>(false);
  const [sideStage, setSideStage] = useState<boolean>(false);
  const [typeStage, setTypeStage] = useState<boolean>(false);
  const [pointWonStage, setPointWonStage] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(0);

  const dispatch = useAppDispatch();

  // handle when the user clicks on the tennis court diagram
  const handleShotLocation = (location: string): void => {
    // hide location stage and show method stage
    setLocationStage(false);
    setMethodStage(true);

    // update shot location
    setShotLocation(location);
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
    if (shotType !== 'overhead' && shotType !== 'serve')
      setShotStroke(`${shotSide}_${type}`);
    else setShotStroke(shotSide);
  };

  const handlePointWon = (won: boolean): void => {
    // update point won
    setPointWon(won);

    // handle end of the point
    handlePointFinish(won);
  };

  const handlePointFinish = async (won: boolean): Promise<void> => {
    // update local state
    dispatch(
      trackMatch({
        pointWon: won,
        match,
        duration,
        side: match.side,
      })
    );

    // update database
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
          shotLocation,
          shotStroke,
          shotMethod
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }

    // reset stages
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
    </div>
  );
};

export default TrackRally;

import { FC, useState } from 'react';

import { IMatchUserProps } from '../../utils/interfaces';

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

  const [locationStage, setLocationStage] = useState<boolean>(true);
  const [methodStage, setMethodStage] = useState<boolean>(false);
  const [sideStage, setSideStage] = useState<boolean>(false);
  const [typeStage, setTypeStage] = useState<boolean>(false);
  const [pointWonStage, setPointWonStage] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(0);

  // handle when the user clicks on the tennis court diagram
  const handleShotLocation = (location: string): void => {
    // TODO delete after testing
    console.log(location);

    // hide location stage and show method stage
    setLocationStage(false);
    setMethodStage(true);

    // update shot location
    setShotLocation(location);
  };

  // handle the user shot method (winner, foreced error, or unforced error)
  const handleShotMethod = (method: string): void => {
    // TODO delete after testing
    console.log(method);

    // hide method stage and show shot side stage
    setMethodStage(false);
    setSideStage(true);

    // update shot method
    setShotMethod(method);
  };

  // handle which side the user hits on (forehand or backhand - exceptions: serve and overhead)
  const handleShotSide = (side: string): void => {
    // TODO delete after testing
    console.log(side);

    // hide side stage and show type stage
    setSideStage(false);
    setTypeStage(true);

    // update shot side
    setShotSide(side);
  };

  // handle what type of shot user hit (groundstroke, volley, slice, dropshot, overhead, or serve)
  const handleShotType = (type: string): void => {
    // TODO delete after testing
    console.log(type);

    // hide type stage and shown point won stage
    setTypeStage(false);
    setPointWonStage(true);

    // update shot type
    setShotType(type);
  };

  const handlePointWon = (won: boolean): void => {
    // TODO delete after testing
    console.log(won);

    // update point won
    setPointWon(won);

    // handle end of the point
    handlePointFinish();
  };

  const handlePointFinish = (): void => {
    // update local state

    // update database
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

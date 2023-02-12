import { FC } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';
import { IUserServingSideProps } from '../../utils/interfaces';

// TODO make this function work for deuce and ad and count second serves and first serves
// TODO add hover effect that shows some details for the point
export const ExactServeStats: FC<IUserServingSideProps> = ({ user, side }) => {
  const { match } = useAppSelector((state) => state.matches);

  return (
    <div className="bg-green-500 p-32 flex justify-center relative">
      {match.pointDetails.map((point, index) => {
        if (point.side === side && point.serving === user) {
          if (point.secondServeLocation !== 'bypass') {
            return (
              <div key={point.id}>
                <div
                  className="z-50 absolute bg-yellow-200 p-2 rounded-full opacity-75 translate-x-1/2 translate-y-negative tooltip"
                  style={{
                    left: parseInt(point.firstServeLocation!.split(',')[0]),
                    top: parseInt(point.firstServeLocation!.split(',')[1]),
                  }}
                  data-tip={`First Serve | ${
                    point.fault === 'first' ? 'In' : 'Out'
                  } | ${point.won ? 'Won' : 'Lost'} | ${
                    point.won
                      ? `${match.pointDetails[index - 1].userDisplayPoints}-${
                          point.oppDisplayPoints
                        }`
                      : `${point.userDisplayPoints}-${
                          match.pointDetails[index - 1].oppDisplayPoints
                        }`
                  }`}
                ></div>
                <div
                  className="z-50 absolute bg-red-600 p-2 rounded-full opacity-75 translate-x-1/2 translate-y-negative tooltip"
                  style={{
                    left: parseInt(point.secondServeLocation!.split(',')[0]),
                    top: parseInt(point.secondServeLocation!.split(',')[1]),
                  }}
                  data-tip={`Second Serve | ${
                    point.fault === 'second' ? 'In' : 'Out'
                  } | ${point.won ? 'Won' : 'Lost'} | ${
                    point.won
                      ? `${match.pointDetails[index - 1].userDisplayPoints}-${
                          point.oppDisplayPoints
                        }`
                      : `${point.userDisplayPoints}-${
                          match.pointDetails[index - 1].oppDisplayPoints
                        }`
                  }`}
                ></div>
              </div>
            );
          } else {
            return (
              <div
                key={point.id}
                className="z-50 absolute bg-yellow-200 p-2 rounded-full opacity-75 translate-x-1/2 translate-y-negative tooltip"
                style={{
                  left: parseInt(point.firstServeLocation!.split(',')[0]),
                  top: parseInt(point.firstServeLocation!.split(',')[1]),
                }}
                data-tip={`First Serve | ${
                  point.fault === 'first' ? 'In' : 'Out'
                } | ${point.won ? 'Won' : 'Lost'} | ${
                  point.won
                    ? `${match.pointDetails[index - 1].userDisplayPoints}-${
                        point.oppDisplayPoints
                      }`
                    : `${point.userDisplayPoints}-${
                        match.pointDetails[index - 1].oppDisplayPoints
                      }`
                }`}
              ></div>
            );
          }
        }
      })}
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley"></div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind"></div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind"></div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce"></div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad"></div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley"></div>
      </div>
    </div>
  );
};

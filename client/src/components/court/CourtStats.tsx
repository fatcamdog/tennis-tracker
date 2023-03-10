import { FC } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';

import { IMatchUserStatsProps, IUserStatsProps } from '../../utils/interfaces';

export const DeuceStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  // Calculates serve percentage to each location and win percentage
  const shotAndWinPercentage = (location: string, user: boolean): string => {
    let locationTotal: number = 0;
    let servesHit: number = 0;
    let pointsWon: number = 0;
    let pointsPlayed: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.side === 'deuce') {
          // updating serves hit to location
          if (point.firstServeLocation === location) locationTotal++;
          if (point.secondServeLocation === location) locationTotal++;

          // updating total serves hit
          if (point.secondServeLocation !== 'bypass') servesHit += 2;
          else servesHit++;

          // checking if point was won
          if (
            point.firstServeLocation === location &&
            point.fault === 'first'
          ) {
            if (point.won === user) pointsWon++;
            pointsPlayed++;
          }
          if (point.secondServeLocation === location) {
            if (point.won === user) pointsWon++;
            pointsPlayed++;
          }
        }
      }
    });

    return `${Math.round((locationTotal / servesHit) * 100)}% hit ${Math.round(
      (pointsWon / pointsPlayed) * 100
    )}% won`;
  };

  // TODO show difference in locations between first serve and second serve

  return (
    <div>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
          <button className="absolute flex items-center justify-center rounded inset-2 top-1/2 bg-red-500">
            <p className="-rotate-90">
              {shotAndWinPercentage('serve_wide_wide', user)}
            </p>
          </button>
        </div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind outline outline-2 outline-white">
          <button className="flex items-center justify-center h-12 grow bg-red-500">
            <p>{shotAndWinPercentage('long', user)}</p>
          </button>
        </div>
        <div className="bg-blue-400"></div>
        <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="bg-green-500 rounded grow">
            <p>{shotAndWinPercentage('serve_wide_deuce', user)}</p>
          </button>
          <button className="bg-green-500 rounded grow">
            <p>{shotAndWinPercentage('serve_middle_deuce', user)}</p>
          </button>
          <button className="bg-green-500 rounded grow">
            <p>{shotAndWinPercentage('serve_tee_deuce', user)}</p>
          </button>
        </div>
        <div className="flex p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="flex items-center justify-center w-1/3 rounded bg-red-500">
            <p className="rotate-90">
              {shotAndWinPercentage('serve_wide_wide', user)}
            </p>
          </button>
        </div>
        <div className="bg-blue-400 outline outline-2 outline-white grid-in-right-alley"></div>
      </div>
      <button
        className="h-12 mt-2 rounded grid-in-net bg-red-500"
        style={{ width: '42rem' }}
      >
        <p>{shotAndWinPercentage('net', user)}</p>
      </button>
    </div>
  );
};

export const AdStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  // Calculates serve percentage to each location and win percentage
  const shotAndWinPercentage = (location: string, user: boolean): string => {
    let locationTotal: number = 0;
    let servesHit: number = 0;
    let pointsWon: number = 0;
    let pointsPlayed: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.side === 'ad') {
          // updating serves hit to location
          if (point.firstServeLocation === location) locationTotal++;
          if (point.secondServeLocation === location) locationTotal++;

          // updating total serves hit
          if (point.secondServeLocation !== 'bypass') servesHit += 2;
          else servesHit++;

          // checking if point was won
          if (
            point.firstServeLocation === location &&
            point.fault === 'first'
          ) {
            if (point.won === user) pointsWon++;
            pointsPlayed++;
          }
          if (point.secondServeLocation === location) {
            if (point.won === user) pointsWon++;
            pointsPlayed++;
          }
        }
      }
    });

    return `${Math.round((locationTotal / servesHit) * 100)}% hit ${Math.round(
      (pointsWon / pointsPlayed) * 100
    )}% won`;
  };

  return (
    <div>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley"></div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind"></div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-right-behind">
          <button className="flex items-center justify-center h-12 rounded grow bg-red-500">
            <p>{shotAndWinPercentage('long', user)}</p>
          </button>
        </div>
        <div className="flex justify-end p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="flex items-center justify-center w-1/3 rounded bg-red-500">
            <p className="-rotate-90">
              {shotAndWinPercentage('serve_wide_tee', user)}
            </p>
          </button>
        </div>
        <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="bg-green-500 rounded grow">
            {shotAndWinPercentage('serve_tee_ad', user)}
          </button>
          <button className="bg-green-500 rounded grow">
            {shotAndWinPercentage('serve_middle_ad', user)}
          </button>
          <button className="bg-green-500 rounded grow">
            {shotAndWinPercentage('serve_wide_ad', user)}
          </button>
        </div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
          <button className="absolute flex items-center justify-center rounded inset-2 top-1/2 bg-red-500">
            <p className="rotate-90">
              {shotAndWinPercentage('serve_wide_wide', user)}
            </p>
          </button>
        </div>
      </div>
      <button
        className="h-12 mt-2 rounded grid-in-net bg-red-500"
        style={{ width: '42rem' }}
      >
        <p>{shotAndWinPercentage('net', user)}</p>
      </button>
    </div>
  );
};

export const ReturnStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  // calculates return percentage to each location and win percentage
  const shotAndWinPercentage = (location: string, user: boolean): string => {
    let locationTotal: number = 0;
    let returnsHit: number = 0;
    let pointsWon: number = 0;

    match.pointDetails.map((point) => {
      if (!point.serving === user) {
        if (point.location !== 'bypass') {
          // updating returns hit and total returns
          if (point.location === location) {
            locationTotal++;
            if (point.won === user) pointsWon++;
          }
          returnsHit++;
        }
      }
    });

    return `${Math.round((locationTotal / returnsHit) * 100)}% hit ${Math.round(
      (pointsWon / locationTotal) * 100
    )}% won`;
  };

  return (
    <div>
      <button
        className="h-12 mb-2 bg-red-500 rounded"
        style={{ width: '42rem' }}
      >
        <p>{shotAndWinPercentage('long', user)}</p>
      </button>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
          <button className="absolute flex items-center justify-center bg-red-500 rounded inset-2">
            <p className="-rotate-90">
              {shotAndWinPercentage('wide_deuce', user)}
            </p>
          </button>
        </div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind">
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('deep_deuce', user)}
          </button>
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none">
            {shotAndWinPercentage('deep_middle', user)}
          </button>
        </div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind">
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none">
            {/* {shotAndWinPercentage('deep_middle', user)} */}
          </button>
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('deep_ad', user)}
          </button>
        </div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('short_deuce', user)}
          </button>
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none">
            {shotAndWinPercentage('short_middle', user)}
          </button>
        </div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none">
            {/* {shotAndWinPercentage('short_middle', user)} */}
          </button>
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('short_ad', user)}
          </button>
        </div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
          <button className="absolute flex items-center justify-center bg-red-500 rounded inset-2">
            <p className="rotate-90">{shotAndWinPercentage('wide_ad', user)}</p>
          </button>
        </div>
      </div>
      <button
        className="h-12 mt-2 bg-red-500 rounded grid-in-net"
        style={{ width: '42rem' }}
      >
        <p>{shotAndWinPercentage('net', user)}</p>
      </button>
    </div>
  );
};

export const RallyCourtStats: FC<IUserStatsProps> = ({ user }) => {
  const { match } = useAppSelector((state) => state.matches);

  // calculates precentage of shots and win percentage on each court section
  const shotAndWinPercentage = (location: string, user: string): string => {
    let userBool: boolean;
    let shotsTotal: number = 0;
    let shotStargetsHit: number = 0; // how many shots went to that one location: ex. long
    let pointsWon: number = 0;

    if (user === 'user') userBool = true;
    if (user === 'opponent') userBool = false;

    match.pointDetails.map((point) => {
      // check if user or opponent hit the shot
      if (point.hitter === user) {
        // check if shot went to right location
        if (point.location === location) {
          shotStargetsHit++;
          // check if point was won in that location
          if (point.won === userBool) {
            pointsWon++;
          }
        }
        // increase total shots hit by user or opponent
        shotsTotal++;
      }
    });

    return `${Math.round(
      (shotStargetsHit / shotsTotal) * 100
    )}% hit ${Math.round((pointsWon / shotStargetsHit) * 100)}% won`;
  };

  return (
    <div>
      <button
        className="h-12 mb-2 bg-red-500 rounded"
        style={{ width: '42rem' }}
      >
        <p>{shotAndWinPercentage('long', user)}</p>
      </button>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
          <button className="absolute flex items-center justify-center bg-red-500 rounded inset-2">
            <p className="-rotate-90">
              {shotAndWinPercentage('wide_deuce', user)}
            </p>
          </button>
        </div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind">
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('deep_deuce', user)}
          </button>
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none">
            {shotAndWinPercentage('deep_middle', user)}
          </button>
        </div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind">
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none">
            {/* {shotAndWinPercentage('deep_middle', user)} */}
          </button>
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('deep_ad', user)}
          </button>
        </div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('short_deuce', user)}
          </button>
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none">
            {shotAndWinPercentage('short_middle', user)}
          </button>
        </div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none">
            {/* {shotAndWinPercentage('short_middle', user)} */}
          </button>
          <button className="w-2/3 h-full bg-green-500 rounded">
            {shotAndWinPercentage('short_ad', user)}
          </button>
        </div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
          <button className="absolute flex items-center justify-center bg-red-500 rounded inset-2">
            <p className="rotate-90">{shotAndWinPercentage('wide_ad', user)}</p>
          </button>
        </div>
      </div>
      <button
        className="h-12 mt-2 bg-red-500 rounded grid-in-net"
        style={{ width: '42rem' }}
      >
        <p>{shotAndWinPercentage('net', user)}</p>
      </button>
    </div>
  );
};

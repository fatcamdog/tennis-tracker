import { FC } from 'react';

import { IMatchUserStatsProps } from '../../utils/interfaces';

export const DeuceStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  // Calculates serve percentage to each location and win percentage
  const shotAndWinPercentage = (location: string, user: boolean): string => {
    let locationTotal: number = 0;
    let servesHit: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.side === 'deuce') {
          if (point.firstServeLocation === location) locationTotal++;
          if (point.secondServeLocation === location) locationTotal++;
          if (point.secondServeLocation !== 'bypass') servesHit += 2;
          else servesHit++;
        }
      }
    });

    return `${Math.round((locationTotal / servesHit) * 100)}%`;
  };

  // TODO show difference in locations between first serve and second serve

  return (
    <div>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
          <button className="absolute flex items-center justify-center rounded inset-2 top-1/2 bg-red-500">
            <p className="-rotate-90">
              {shotAndWinPercentage('serve_wide_wide', true)}
            </p>
          </button>
        </div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind outline outline-2 outline-white">
          <button className="flex items-center justify-center h-12 grow bg-red-500">
            <p>Long</p>
          </button>
        </div>
        <div className="bg-blue-400"></div>
        <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="bg-green-500 rounded grow"></button>
          <button className="bg-green-500 rounded grow"></button>
          <button className="bg-green-500 rounded grow"></button>
        </div>
        <div className="flex p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="flex items-center justify-center w-1/3 rounded bg-red-500">
            <p className="rotate-90">Wide</p>
          </button>
        </div>
        <div className="bg-blue-400 outline outline-2 outline-white grid-in-right-alley"></div>
      </div>
      <button
        className="h-12 mt-2 rounded grid-in-net bg-red-500"
        style={{ width: '42rem' }}
      >
        <p>Net</p>
      </button>
    </div>
  );
};

export const AdStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  return (
    <div>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley"></div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind"></div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-right-behind">
          <button className="flex items-center justify-center h-12 rounded grow bg-red-500">
            <p>Long</p>
          </button>
        </div>
        <div className="flex justify-end p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="flex items-center justify-center w-1/3 rounded bg-red-500">
            <p className="-rotate-90">Wide</p>
          </button>
        </div>
        <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="bg-green-500 rounded grow"></button>
          <button className="bg-green-500 rounded grow"></button>
          <button className="bg-green-500 rounded grow"></button>
        </div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
          <button className="absolute flex items-center justify-center rounded inset-2 top-1/2 bg-red-500">
            <p className="rotate-90">Wide</p>
          </button>
        </div>
      </div>
      <button
        className="h-12 mt-2 rounded grid-in-net bg-red-500"
        style={{ width: '42rem' }}
      >
        <p>Net</p>
      </button>
    </div>
  );
};

export const ReturnStats: FC<IMatchUserStatsProps> = ({ match, user }) => {
  return (
    <div>
      <button
        className="h-12 mb-2 bg-red-500 rounded"
        style={{ width: '42rem' }}
      >
        <p>Long</p>
      </button>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
          <button className="absolute flex items-center justify-center bg-red-500 rounded inset-2">
            <p className="-rotate-90">Wide on deuce side</p>
          </button>
        </div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind">
          <button className="w-2/3 h-full bg-green-500 rounded"></button>
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none"></button>
        </div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind">
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none"></button>
          <button className="w-2/3 h-full bg-green-500 rounded"></button>
        </div>
        <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button className="w-2/3 h-full bg-green-500 rounded"></button>
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none"></button>
        </div>
        <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none"></button>
          <button className="w-2/3 h-full bg-green-500 rounded"></button>
        </div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
          <button className="absolute flex items-center justify-center bg-red-500 rounded inset-2">
            <p className="rotate-90">Wide on ad side</p>
          </button>
        </div>
      </div>
      <button
        className="h-12 mt-2 bg-red-500 rounded grid-in-net"
        style={{ width: '42rem' }}
      >
        <p>Net</p>
      </button>
    </div>
  );
};

import { FC } from 'react';

import { IHandleShotLocationProps } from '../../utils/interfaces';

const RallyCourt: FC<IHandleShotLocationProps> = ({ handleShotLocation }) => {
  return (
    <div>
      <div>
        <p>Click where your last shot of the rally went</p>
        <div className="flex items-center gap-2 my-2">
          <p>or</p>{' '}
          <button
            className="btn btn-accent btn-sm"
            onClick={() => handleShotLocation('ace')}
          >
            Aced
          </button>
          <p>or</p>
          <button
            className="btn btn-accent btn-sm"
            onClick={() => handleShotLocation('double')}
          >
            Double fault
          </button>
        </div>
      </div>
      {/* tennis court diagram */}
      <div>
        <button
          className="h-12 mb-2 bg-red-500 rounded"
          style={{ width: '42rem' }}
          onClick={() => handleShotLocation('long')}
        >
          <p>Long</p>
        </button>
        <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
          <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
            <button
              className="absolute flex items-center justify-center bg-red-500 rounded inset-2"
              onClick={() => handleShotLocation('wide_deuce')}
            >
              <p className="-rotate-90">Wide on deuce side</p>
            </button>
          </div>
          <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind">
            <button
              className="w-2/3 h-full bg-green-500 rounded"
              onClick={() => handleShotLocation('deep_deuce')}
            ></button>
            <button
              className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none"
              onClick={() => handleShotLocation('deep_middle')}
            ></button>
          </div>
          <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind">
            <button
              className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none"
              onClick={() => handleShotLocation('deep_middle')}
            ></button>
            <button
              className="w-2/3 h-full bg-green-500 rounded"
              onClick={() => handleShotLocation('deep_ad')}
            ></button>
          </div>
          <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
            <button
              className="w-2/3 h-full bg-green-500 rounded"
              onClick={() => handleShotLocation('short_deuce')}
            ></button>
            <button
              className="w-1/3 h-full bg-green-500 rounded rounded-tr-none rounded-br-none"
              onClick={() => handleShotLocation('short_middle')}
            ></button>
          </div>
          <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad">
            <button
              className="w-1/3 h-full bg-green-500 rounded rounded-tl-none rounded-bl-none"
              onClick={() => handleShotLocation('short_middle')}
            ></button>
            <button
              className="w-2/3 h-full bg-green-500 rounded"
              onClick={() => handleShotLocation('short_ad')}
            ></button>
          </div>
          <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
            <button
              className="absolute flex items-center justify-center bg-red-500 rounded inset-2"
              onClick={() => handleShotLocation('wide_ad')}
            >
              <p className="rotate-90">Wide on ad side</p>
            </button>
          </div>
        </div>
        <button
          className="h-12 mt-2 bg-red-500 rounded grid-in-net"
          style={{ width: '42rem' }}
          onClick={() => handleShotLocation('net')}
        >
          <p>Net</p>
        </button>
      </div>
    </div>
  );
};

export default RallyCourt;

import { FC } from 'react';

import { IHandleServeLocationProps } from '../../utils/interfaces';

export const DeuceSide: FC<IHandleServeLocationProps> = ({
  handleServeLocation,
}) => {
  return (
    <div>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley">
          <button
            onClick={() => handleServeLocation('serve_wide_wide', false)}
            className={`absolute flex items-center justify-center rounded inset-2 top-1/2 ${
              'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
            }`}
          >
            <p className="-rotate-90">Wide</p>
          </button>
        </div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind outline outline-2 outline-white">
          <button
            onClick={() => handleServeLocation('long', false)}
            className={`flex items-center justify-center h-12 grow ${
              'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
            }`}
          >
            <p>Long</p>
          </button>
        </div>
        <div className="bg-blue-400"></div>
        <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button
            onClick={() => handleServeLocation('serve_wide_deuce', true)}
            className="bg-green-500 rounded grow"
          ></button>
          <button
            onClick={() => handleServeLocation('serve_middle_deuce', true)}
            className="bg-green-500 rounded grow"
          ></button>
          <button
            onClick={() => handleServeLocation('serve_tee_deuce', true)}
            className="bg-green-500 rounded grow"
          ></button>
        </div>
        <div className="flex p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button
            onClick={() => handleServeLocation('serve_wide_tee', false)}
            className={`flex items-center justify-center w-1/3 rounded ${
              'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
            }`}
          >
            <p className="rotate-90">Wide</p>
          </button>
        </div>
        <div className="bg-blue-400 outline outline-2 outline-white grid-in-right-alley"></div>
      </div>
      <button
        onClick={() => handleServeLocation('net', false)}
        className={`h-12 mt-2 rounded grid-in-net ${
          'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
        }`}
        style={{ width: '42rem' }}
      >
        <p>Net</p>
      </button>
    </div>
  );
};

export const AdSide: FC<IHandleServeLocationProps> = ({
  handleServeLocation,
}) => {
  return (
    <div>
      <div className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white">
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley"></div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-left-behind"></div>
        <div className="flex items-end p-2 bg-blue-400 grid-in-right-behind">
          <button
            onClick={() => handleServeLocation('long', false)}
            className={`flex items-center justify-center h-12 rounded grow ${
              'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
            }`}
          >
            <p>Long</p>
          </button>
        </div>
        <div className="flex justify-end p-2 bg-blue-400 outline outline-2 outline-white grid-in-deuce">
          <button
            onClick={() => handleServeLocation('serve_wide_tee', false)}
            className={`flex items-center justify-center w-1/3 rounded ${
              'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
            }`}
          >
            <p className="-rotate-90">Wide</p>
          </button>
        </div>
        <div className="flex gap-2 p-2 bg-blue-400 outline outline-2 outline-white grid-in-ad">
          <button
            onClick={() => handleServeLocation('serve_tee_ad', true)}
            className="bg-green-500 rounded grow"
          ></button>
          <button
            onClick={() => handleServeLocation('serve_middle_ad', true)}
            className="bg-green-500 rounded grow"
          ></button>
          <button
            onClick={() => handleServeLocation('serve_wide_ad', true)}
            className="bg-green-500 rounded grow"
          ></button>
        </div>
        <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley">
          <button
            onClick={() => handleServeLocation('serve_wide_wide', false)}
            className={`absolute flex items-center justify-center rounded inset-2 top-1/2 ${
              'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
            }`}
          >
            <p className="rotate-90">Wide</p>
          </button>
        </div>
      </div>
      <button
        onClick={() => handleServeLocation('net', false)}
        className={`h-12 mt-2 rounded grid-in-net ${
          'first' === 'first' ? 'bg-orange-400' : 'bg-red-500'
        }`}
        style={{ width: '42rem' }}
      >
        <p>Net</p>
      </button>
    </div>
  );
};

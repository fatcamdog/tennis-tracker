import { FC, MouseEvent } from 'react';

import {
  IHandleShotLocationProps,
  IHandleServeLocationProps,
} from '../../utils/interfaces';

export const ExactRallyCourt: FC<IHandleShotLocationProps> = ({
  handleShotLocation,
}) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    let x: number = e.pageX - e.currentTarget.offsetLeft; // finding x cord
    let y: number = e.pageY - e.currentTarget.offsetTop; // finding y cord
    let cord: string = `${x},${y}`; // combining x and y cords
    let inPlay: boolean = false; // declaring in play variable

    // defining court boundaries based on coordinates
    let leftXBoundary: number = 245;
    let rightXBoundary: number = 693;
    let topYBoundary: number = 125;
    let bottomYBoundary: number = 769;

    // checking if shot was in or out
    if (
      x < leftXBoundary ||
      x > rightXBoundary ||
      y < topYBoundary ||
      y > bottomYBoundary
    ) {
      inPlay = false;
    } else {
      inPlay = true;
    }

    return handleShotLocation(cord, inPlay);
  };

  return (
    <div
      className="bg-green-500 p-32 flex justify-center cursor-crosshair"
      onClick={handleClick}
    >
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

export const ExactServeCourt: FC<IHandleServeLocationProps> = ({
  handleServeLocation,
  side,
}) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    let x: number = e.pageX - e.currentTarget.offsetLeft; // finding x cord
    let y: number = e.pageY - e.currentTarget.offsetTop; // finding y cord
    let cord: string = `${x},${y}`; // combining x and y cords
    let inPlay: boolean = false; // declaring in play variable

    // defining court boundaries based on coordinates
    let leftXBoundary: number;
    let rightXBoundary: number;
    let topYBoundary: number = 445;
    let bottomYBoundary: number = 769;

    // change x boundaries depending if on deuce or ad side
    if (side === 'deuce') {
      leftXBoundary = 245;
      rightXBoundary = 469;
    } else {
      leftXBoundary = 467;
      rightXBoundary = 693;
    }

    // checking if shot was in or out
    if (
      x < leftXBoundary ||
      x > rightXBoundary ||
      y < topYBoundary ||
      y > bottomYBoundary
    ) {
      inPlay = false;
    } else {
      inPlay = true;
    }

    console.log(side, inPlay);

    return handleServeLocation(cord, inPlay);
  };

  return (
    <div
      className="bg-green-500 p-32 flex justify-center cursor-crosshair"
      onClick={handleClick}
    >
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

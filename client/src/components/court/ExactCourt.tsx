import { MouseEvent } from 'react';

const ExactCourt = () => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    console.log(
      e.pageX - e.currentTarget.offsetLeft,
      e.pageY - e.currentTarget.offsetTop
    );
  };

  return (
    <div>
      <div>
        <div
          className="relative after:content-[''] after:px-px after:py-2 after:absolute after:top-0 after:left-1/2 after:bg-white grid grid-areas-court grid-cols-court grid-rows-court w-fit outline outline-2 outline-white cursor-crosshair"
          onClick={handleClick}
        >
          <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-left-alley"></div>
          <div className="flex gap-2 p-2 pr-0 bg-blue-400 grid-in-left-behind"></div>
          <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 grid-in-right-behind"></div>
          <div className="flex gap-2 p-2 pr-0 bg-blue-400 outline outline-2 outline-white grid-in-deuce"></div>
          <div className="flex justify-end gap-2 p-2 pl-0 bg-blue-400 outline outline-2 outline-white grid-in-ad"></div>
          <div className="relative bg-blue-400 outline outline-2 outline-white grid-in-right-alley"></div>
        </div>
      </div>
    </div>
  );
};

export default ExactCourt;

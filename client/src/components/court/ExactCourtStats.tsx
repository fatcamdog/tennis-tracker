import { useAppSelector } from '../../hooks/reduxHooks';

export const ExactDeuceStats = () => {
  const { match } = useAppSelector((state) => state.matches);

  return (
    <div className="bg-green-500 p-32 flex justify-center relative">
      {match.pointDetails.map((point) => {
        return (
          <div
            key={point.id}
            className="z-50 absolute bg-yellow-200 p-2 rounded-full"
            style={{
              left: parseInt(point.firstServeLocation!.split(',')[0]),
              top: parseInt(point.firstServeLocation!.split(',')[1]),
            }}
          ></div>
        );
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

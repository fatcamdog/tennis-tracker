const calculateMinsAndHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  let mins: number | string = minutes % 60;

  if (mins < 10 && hours !== 0) mins = ('0' + mins).slice(-2);

  if (hours === 0) return `${mins}m`;
  return `${hours}:${mins}`;
};

export default calculateMinsAndHours;

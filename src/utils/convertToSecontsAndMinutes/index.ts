function convertToSecondsAndMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {
    minutes: minutes ?? 0,
    seconds: seconds ?? 0,
    text: `${Math.round(minutes || 0)}:${Math.round(seconds || 0)}`
  };
}
export default convertToSecondsAndMinutes;

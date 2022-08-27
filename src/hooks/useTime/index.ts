import { ISong } from '@Types/index';

type Tracks = ISong;

export type UseTimeProps = { tracks?: Tracks[]; duration_ms?: number };

const convertMsToTime = (duration_ms: number) => {
  const hours = Math.floor(duration_ms / 3600000);
  const minutes = Math.floor(duration_ms / 60000) - hours * 60;
  //   const seconds = Math.round((duration_ms % 60000) / 1000);
  if (hours !== 0) {
    return `${hours} Hrs ${minutes} Mins`;
  }
  return `${minutes} Mins`;
};

const reduceDuration = (tracks?: Tracks[]) => {
  let result = 0;
  for (const iterator of tracks ?? []) {
    result += iterator?.duration_ms || 0;
  }
  return result;
};

const useTime = ({ tracks, duration_ms }: UseTimeProps) => {
  const tracksMs = reduceDuration(tracks);
  const returnMs = convertMsToTime(tracksMs || (duration_ms as number));
  return returnMs;
};
export default useTime;

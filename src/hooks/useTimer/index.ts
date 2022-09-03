import { atom, useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { useEffect } from 'react';

type Props = {
  start?: number;
  end: number;
  play: boolean;
  ms?: number;
  callback?: () => void;
};

export const loadTimerAtom = atom(true);

const timerAtom = atomFamily((init: number) => {
  const timerInsideAtom = atom(init, (_, set, arg: number) => {
    set(loadTimerAtom, false);
    set(timerInsideAtom, arg);
  });
  return timerInsideAtom;
});

const useTimer = (props: Props) => {
  const { start, ms, callback } = props;
  const [timer, setTimer] = useAtom(timerAtom(start ?? 3));

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      if (props?.play) {
        if (timer >= props?.end) {
          return;
        } else {
          setTimer(timer + 1);
          callback && callback();
          clearTimeout(intervalTimer);
        }
        clearTimeout(intervalTimer);
      }
    }, ms ?? 1000);

    return () => clearInterval(intervalTimer);
  }, [timer, props?.play, ms, props?.end, props.start]);

  return {
    timer,
    setTimer
  };
};

export default useTimer;

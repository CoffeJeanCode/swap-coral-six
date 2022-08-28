import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { MutableRefObject } from 'react';

export const PROGRESSBAR_ATOM = atomWithStorage('PROGRESSBAR', 0 as number);

export const AUDIOREF_ATOM = atom(
  {} as MutableRefObject<HTMLAudioElement | undefined>
);

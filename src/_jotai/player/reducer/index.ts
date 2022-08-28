import { IImage, ISong } from '@Types/index';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/* eslint-disable no-unused-vars */

type PropsWithTypes<T> = T & {
  images?: IImage[];
};

export type InitialState = {
  currentTrack?: PropsWithTypes<ISong>;
  controls?: {
    aleatory: boolean;
    repeat: boolean;
  };
  context?: ISong[];
};

export const initialState: InitialState = {
  currentTrack: {
    id: '',
    name: 'XDDD',
    artists: []
  },
  controls: {
    aleatory: false,
    repeat: false
  },
  context: []
};

type typesReducers = {
  [key: string]: (state: InitialState, payload: InitialState) => InitialState;
};

const typesReducers: typesReducers = {
  SET_TRACK: (STATE, PAYLOAD) => ({
    ...STATE,
    currentTrack: PAYLOAD.currentTrack,
    context: PAYLOAD.context
  })
};

export type ActionPlayer = {
  type: keyof typeof typesReducers;
  payload?: InitialState;
};

export const REDUCER_PLAYER = (
  state = initialState as InitialState,
  action: ActionPlayer
) => {
  const { type, payload } = action;
  const handler = typesReducers[type];
  const newState = handler ? handler(state, payload as InitialState) : state;
  return newState as InitialState;
};

export const CONTROLS_PLAYER_ATOM = atomWithStorage(
  'SWAPPLAYER',
  initialState as InitialState
);
export const REDUCER_PLAYER_ATOM = (
  reducer: (v: InitialState, a: ActionPlayer) => InitialState
) => {
  const CREATENEWATOM = atom(
    (get) => get(CONTROLS_PLAYER_ATOM),
    (get, set, action: ActionPlayer) =>
      set(CONTROLS_PLAYER_ATOM, reducer(get(CONTROLS_PLAYER_ATOM), action))
  );
  return CREATENEWATOM;
};

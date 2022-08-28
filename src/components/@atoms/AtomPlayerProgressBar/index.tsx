/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useQuery } from '@apollo/client';
import { audioById } from '@Apollo/client/query/audioById';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import useSetRef from '@Hooks/useSetRef';
import { IQueryFilter } from '@Types/index';
import convertToSecondsAndMinutes from '@Utils/convertToSecontsAndMinutes';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { FC, LegacyRef, MutableRefObject, useRef } from 'react';
import { AUDIOREF_ATOM, PROGRESSBAR_ATOM } from '_jotai/player';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomInput from '../AtomInput';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

const AtomPlayerProgressBar: FC = () => {
  const colors = useAtomValue(COLORS_ATOM);
  const [currentTime, setCurrentTime] = useAtom(PROGRESSBAR_ATOM);
  const audio = useRef<HTMLAudioElement>();
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  //   const setPlayPlayer = useSetAtom(PLAY_TRACK_ATOM);
  //   const playerPlayer = useAtomValue(PLAY_TRACK_ATOM);
  //   const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  //   const video = useAtomValue(videoRefAtom);
  const setAudioRef = useSetAtom(AUDIOREF_ATOM);
  useSetRef<MutableRefObject<HTMLAudioElement | undefined>>(
    audio as any,
    setAudioRef
  );
  const totalTime = audio?.current?.duration || 0;

  const { data } = useQuery<IQueryFilter<'audioById'>>(audioById, {
    skip: !controls?.currentTrack?.id,
    variables: {
      id: controls?.currentTrack?.id
    }
  });

  //   useEffect(() => {
  //     if (audio.current) {
  //       const currentTime = localStorage.getItem('PROGRESSBAR');
  //       const volumen = localStorage.getItem('VOLUMENSWAP');
  //       audio.current.currentTime = currentTime as unknown as number;
  //       audio.current.volume = (volumen as unknown as number) / 100;
  //     }
  //   }, []);

  return (
    <AtomWrapper
      customCSS={css`
        width: 100%;
        grid-row: 2;
        display: grid;
        gap: 10px;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        @media (max-width: 980px) {
          grid-row: 2;
        }
      `}
    >
      <AtomText
        as="p"
        color="white"
        customCSS={css`
          margin: 0;
          grid-column: 1;
          @media (max-width: 980px) {
            display: none;
          }
        `}
      >
        {convertToSecondsAndMinutes(currentTime)?.text}
      </AtomText>
      <AtomInput
        id="player-reproductor"
        type="range"
        min="0"
        max={audio.current?.duration ? audio.current.duration : 0}
        value={currentTime}
        // onClick={() => {
        //   //   if (video.current) {
        //   //     video.current.currentTime = currentTime;
        //   //   }
        // }}
        onChange={(event) => {
          if (audio.current) {
            audio.current.currentTime = Number(event.target.value);
          }
        }}
        customCSS={css`
          height: 6px;
          grid-column: 2;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
          background: rgb(92 86 86 / 60%);
          border: none;
          border-radius: 5px;
          background-image: linear-gradient(
            ${colors?.[0]?.hex},
            ${colors?.[0]?.hex}
          );
          background-repeat: no-repeat;
          background-size: ${Math.floor(
              ((((currentTime - 0) * 100) / totalTime ||
                currentTime) as number as number) - 0
            )}%
            100%;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background: ${colors?.[0]?.hex};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          &::-moz-range-thumb {
            -webkit-appearance: none;
            height: 20px;
            border-radius: 50%;
            background: ${colors?.[0]?.hex};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          &::-ms-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${colors?.[0]?.hex};
            cursor: ew-resize;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          &::-webkit-slider-thumb:hover {
            background: ${colors?.[0]?.hex};
          }
          &::-moz-range-thumb:hover {
            background: ${colors?.[0]?.hex};
          }
          &::-ms-thumb:hover {
            background: ${colors?.[0]?.hex};
          }

          &::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
          }
          &::-moz-range-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
          }
          &::-ms-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
          }
          @media (max-width: 980px) {
            height: 2px;
            grid-row: 1 / -1;
            grid-column: 1 / -1;
            ::-webkit-slider-thumb {
              margin-top: -6.95px;
              width: 100%;
              height: 23px;
              opacity: 0;
              background: rgba(241, 86, 209, 0.1);
              border: 2.5px solid #83e584;
              border-radius: 12px;
              cursor: pointer;
              -webkit-appearance: none;
            }
          }
        `}
      />

      <audio
        id="AUDIOPLAYER"
        ref={audio as LegacyRef<HTMLAudioElement>}
        // loop={controls.repeat}
        src={data?.audioById?.audio?.urls?.[0]?.url}
        autoPlay
        onPlaying={() => {
          if (audio.current) {
            audio.current.ontimeupdate = (event: any) => {
              setCurrentTime(event.target.currentTime);
            };
          }
        }}
        onEnded={() => {
          // setPlayPlayer(false);
        }}
      ></audio>

      <AtomText
        as="p"
        color="white"
        customCSS={css`
          margin: 0;
          grid-column: 3;
          @media (max-width: 980px) {
            display: none;
          }
        `}
      >
        {convertToSecondsAndMinutes(audio?.current?.duration as number)?.text}
      </AtomText>
    </AtomWrapper>
  );
};

export default AtomPlayerProgressBar;

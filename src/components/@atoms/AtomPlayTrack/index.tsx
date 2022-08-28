import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { ISong } from '@Types/index';
import { useAtom, useAtomValue } from 'jotai';
import { FC } from 'react';
import { AUDIOREF_ATOM } from '_jotai/player';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import { PLAY_TRACK_ATOM } from '../AtomPlayPlayer';
import { AtomText } from '../AtomText';

type Props = {
  trackNumber?: number;
  onPlay?: () => void;
} & ISong;

const AtomPlayTrack: FC<Props> = (props) => {
  const colors = useAtomValue(COLORS_ATOM);
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [play, setPlayPlayer] = useAtom(PLAY_TRACK_ATOM);
  const audio = useAtomValue(AUDIOREF_ATOM);
  return (
    <AtomButton
      onClick={() => {
        props?.onPlay && props?.onPlay();
        if (audio.current) {
          setPlayPlayer((prev) => !prev);
          play ? audio.current.pause() : audio.current.play();
        }
      }}
      backgroundColor="transparent"
      customCSS={css`
        grid-column: 1;
        justify-self: center;
        align-self: center;
        position: relative;
        margin: 0;
        padding: 0;
        @media (max-width: 980px) {
          display: none;
        }
      `}
    >
      {controls?.currentTrack?.id !== props?.id && (
        <AtomText
          as="p"
          color="white"
          customCSS={css`
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-weight: 600;
            opacity: 1;
            &:hover {
              display: none;
              opacity: 0;
            }
          `}
        >
          {props?.trackNumber as number}
        </AtomText>
      )}

      {controls?.currentTrack?.id === props?.id && (
        <AtomIcon
          customCSS={css`
            position: absolute;
            &:hover {
              background-color: #222229;
              opacity: 1;
            }
            svg {
              path {
                stroke: ${colors?.[1]?.hex ?? colors?.[0]?.hex};
              }
            }
          `}
          width="25px"
          height="25px"
          icon="https://res.cloudinary.com/whil/image/upload/v1661675068/soundinprogress_bo4fv8.svg"
        />
      )}
      <AtomIcon
        customCSS={css`
          padding: 5px;
          background-color: #121216;
          position: absolute;
          opacity: 0;
          &:hover {
            background-color: #222229;
            opacity: 1;
          }
        `}
        width="30px"
        height="30px"
        color={colors?.[1]?.hex ?? colors?.[0]?.hex}
        icon={
          controls?.currentTrack?.id === props?.id && play
            ? 'https://res.cloudinary.com/whil/image/upload/v1661401538/pause_he3p5p.svg'
            : 'https://res.cloudinary.com/whil/image/upload/v1661401539/play_obtqfo.svg'
        }
      />
    </AtomButton>
  );
};

export default AtomPlayTrack;

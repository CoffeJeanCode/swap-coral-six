import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { ISong } from '@Types/index';
import useIframe from '@Utils/useRefIframe';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import { PLAY_IFRAME_ATOM } from '../AtomPlayerIframe';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

type Props = {
  trackNumber?: number;
  onPlay?: () => void;
} & ISong;

const AtomPlayTrack: FC<Props> = (props) => {
  const colors = useAtomValue(COLORS_ATOM);
  const router = useRouter();
  const spotifyEmbedWindow = useIframe();
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [play, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);

  const validateContext = controls?.origin?.query?.id === router.query?.id;

  const validTrackId = controls?.currentTrack?.id === props.id;
  const inValidTrackId = controls?.currentTrack?.id !== props?.id;

  return (
    <AtomButton
      onClick={() => {
        if (validTrackId && validateContext) {
          props?.onPlay && props?.onPlay();
          setPlayIFRAME((prev) => !prev);
          spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
        }
        if (inValidTrackId && validateContext) {
          props?.onPlay && props?.onPlay();
          setPlayIFRAME(true);
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
      {inValidTrackId && (
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
      {validTrackId && !validateContext && (
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

      {validTrackId && validateContext && (
        <AtomWrapper
          width="25px"
          height="25px"
          alignItems="center"
          justifyContent="center"
          customCSS={css`
            position: absolute;
          `}
        >
          <AtomIcon
            customCSS={css`
              position: absolute;
              &:hover {
                background-color: #222229;
                opacity: 1;
              }
              svg {
                path {
                  stroke: ${colors?.[0]?.hex};
                }
              }
            `}
            width="25px"
            height="25px"
            icon="https://res.cloudinary.com/whil/image/upload/v1661675068/soundinprogress_bo4fv8.svg"
          />
        </AtomWrapper>
      )}
      <AtomWrapper
        width="30px"
        height="30px"
        alignItems="center"
        justifyContent="center"
        customCSS={css`
          background-color: #121216;
          position: absolute;
          opacity: 0;
          &:hover {
            background-color: #222229;
            opacity: 1;
          }
        `}
      >
        <AtomIcon
          customCSS={css`
            background-color: #121216;
            opacity: 0;
            &:hover {
              background-color: #222229;
              opacity: 1;
            }
          `}
          width="30px"
          height="30px"
          color={colors?.[0]?.hex}
          icon={
            validTrackId && play && validateContext
              ? 'https://res.cloudinary.com/whil/image/upload/v1661401538/pause_he3p5p.svg'
              : 'https://res.cloudinary.com/whil/image/upload/v1661401539/play_obtqfo.svg'
          }
        />
      </AtomWrapper>
    </AtomButton>
  );
};

export default AtomPlayTrack;

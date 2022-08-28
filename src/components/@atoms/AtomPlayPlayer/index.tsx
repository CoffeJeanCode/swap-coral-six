import { css } from '@emotion/react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { FC } from 'react';
import { AUDIOREF_ATOM } from '_jotai/player';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';

export const PLAY_TRACK_ATOM = atom(false);

const AtomPlayPlayer: FC = () => {
  const [play, setPlayPlayer] = useAtom(PLAY_TRACK_ATOM);
  const audio = useAtomValue(AUDIOREF_ATOM);
  return (
    <AtomButton
      padding="0px"
      backgroundColor="transparent"
      onClick={() => {
        if (audio.current) {
          setPlayPlayer((prev) => !prev);
          // audio.current.play();
          play ? audio.current.pause() : audio.current.play();
        }
      }}
    >
      <AtomIcon
        width="45px"
        height="45px"
        customCSS={css`
          svg {
            path {
              stroke: white;
            }
          }
        `}
        // icon="https://res.cloudinary.com/whil/image/upload/v1661401539/play_obtqfo.svg"
        icon={
          play
            ? 'https://res.cloudinary.com/whil/image/upload/v1661674261/pause-circle_yw7s3n.svg'
            : 'https://res.cloudinary.com/whil/image/upload/v1661674252/play-circle_tq6brv.svg'
        }
      />
    </AtomButton>
  );
};

export default AtomPlayPlayer;

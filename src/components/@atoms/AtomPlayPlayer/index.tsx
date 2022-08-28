import { css } from '@emotion/react';
import { FC } from 'react';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';

type Props = {
  width?: string;
  height?: string;
};

const AtomPlayPlayer: FC<Props> = (props) => {
  return (
    <AtomButton
      padding="0px"
      backgroundColor="transparent"
      onClick={() => {
        // if (audio.current) {
        //   setPlay((prev) => !prev);
        //   play ? audio.current.pause() : audio.current.play();
        // }
      }}
    >
      <AtomIcon
        width={props.width}
        height={props.height}
        customCSS={css`
          svg {
            path {
              stroke: white;
            }
          }
        `}
        icon="https://res.cloudinary.com/whil/image/upload/v1661401539/play_obtqfo.svg"
        // icon={
        //   play
        //     ? 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/ZZEV3WD/icons/pause-circle.svg'
        //     : 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/ZZEV3WD/icons/play-circle.svg'
        // }
      />
    </AtomButton>
  );
};

export default AtomPlayPlayer;

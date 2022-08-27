import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import { AtomText } from '../AtomText';

type Props = {
  position: number;
};

const AtomPlayTrack: FC<Props> = (props) => {
  const colors = useAtomValue(COLORS_ATOM);
  return (
    <AtomButton
      onClick={async () => {}}
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
        {props.position + 1}
      </AtomText>
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
        color={colors?.[0]?.hex}
        icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/ZZEV3WD/icons/pause.svg"
        // icon={
        //   controls?.player?.currentTrack?.name === props?.name && playPlayer
        //     ? 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/ZZEV3WD/icons/pause.svg'
        //     : 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/ZZEV3WD/icons/play.svg'
        // }
      />
    </AtomButton>
  );
};

export default AtomPlayTrack;

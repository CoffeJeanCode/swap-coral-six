import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { IAlbumType, IImage, IlistPlaylistsBySlug, ISong } from '@Types/index';
import useIframe from '@Utils/useRefIframe';
import { useAtom, useAtomValue } from 'jotai';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import { PLAY_IFRAME_ATOM } from '../AtomPlayerIframe';
import AtomWrapper from '../Atomwrapper';

type Props = {
  context: IAlbumType | IlistPlaylistsBySlug;
};

function getRandomTrack(list: ISong[]) {
  return list[Math.floor(Math.random() * list.length)];
}

const AtomPlayByAlbumPlaylist: FC<Props> = (props) => {
  const colors = useAtomValue(COLORS_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [playIFRAME, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);
  const isValidContext =
    controls?.currentTrack?.album?.id === props?.context?.id;

  const spotifyEmbedWindow = useIframe();

  return (
    <AtomWrapper
      padding="45px 90px"
      maxWidth="1440px"
      flexDirection="row"
      flexWrap="wrap"
      customCSS={css`
        gap: 10px;
        @media (max-width: 980px) {
          padding: 0px 30px;
        }
      `}
    >
      <AtomButton
        padding="10px"
        borderRadius="50%"
        backgroundColor={colors?.[0].hex}
        width="60px"
        height="60px"
        onClick={() => {
          if (isValidContext) {
            setPlayIFRAME((prev) => !prev);
            spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
          } else {
            const randomTrack = getRandomTrack(
              props?.context.tracks?.items as ISong[]
            );
            setPlayIFRAME(true);
            dispatch({
              type: 'SET_TRACK',
              payload: {
                currentTrack: {
                  ...randomTrack,
                  // artists: data?.albumById?.artists,
                  images: props?.context?.images as IImage[],
                  album: props?.context,
                  destination: {
                    type: 'album',
                    id: props?.context?.id as string
                  }
                },
                context: props?.context?.tracks?.items?.map((item) => ({
                  ...item,
                  album: props?.context,
                  images: props?.context?.images as IImage[],
                  destination: {
                    type: 'album',
                    id: props?.context?.id as string
                  }
                }))
              }
            });
          }
        }}
      >
        <AtomIcon
          icon={
            isValidContext && playIFRAME
              ? 'https://res.cloudinary.com/whil/image/upload/v1663126781/pause2_bsfjh5.svg'
              : 'https://res.cloudinary.com/whil/image/upload/v1663125500/play_azdkls.svg'
          }
          width="30px"
          height="30px"
          customCSS={css`
            svg {
              path {
                fill: none !important;
                stroke: #ffffff;
              }
            }
          `}
        />
      </AtomButton>
    </AtomWrapper>
  );
};

export default AtomPlayByAlbumPlaylist;

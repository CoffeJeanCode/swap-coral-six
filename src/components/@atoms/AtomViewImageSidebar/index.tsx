import { css } from '@emotion/react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomImage from '../AtomImage';

export const VIEWIMAGESIDEBAR_ATOM = atom(false);

const AtomViewImageSidebar: FC = () => {
  const [view, setView] = useAtom(VIEWIMAGESIDEBAR_ATOM);
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  return (
    <>
      {view && (
        <AtomButton
          padding="0px"
          width="100%"
          height="100%"
          customCSS={css`
            grid-row: 3;
          `}
          onClick={() => {
            setView(false);
          }}
        >
          <AtomImage
            width="100%"
            height="100%"
            alt="swap"
            borderRadius="10px 10px 0px 0px"
            src={controls?.currentTrack?.images?.[0]?.url as string}
            customCSS={css`
              img {
                transition: transform 0.5s ease-in-out;

                height: 100%;
              }
            `}
          />
        </AtomButton>
      )}
    </>
  );
};

export default AtomViewImageSidebar;

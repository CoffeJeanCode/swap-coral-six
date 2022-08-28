/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ChangeEvent, FC, useState } from 'react';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomInput from '../AtomInput';

export const volumenAtom = atomWithStorage('VOLUMENSWAP', 0 as number);

const AtomVolumenPlayer: FC = () => {
  const [volumen, setvolumen] = useAtom(volumenAtom);
  const colors = useAtomValue(COLORS_ATOM);
  //   const audio = useAtomValue(audioRefAtom);
  const [storeVolumen, setStoreVolumen] = useState(0);

  return (
    <>
      <AtomButton
        padding="0px"
        backgroundColor="transparent"
        onClick={() => {
          if (true) {
            if (volumen === 0) {
              setvolumen(storeVolumen * 100);
              // audio.current.volume = storeVolumen;
            } else {
              setStoreVolumen(volumen / 100);
              setvolumen(0);
              // audio.current.volume = 0;
            }
          }
        }}
      >
        <AtomIcon
          icon={
            volumen > 60
              ? 'https://res.cloudinary.com/whil/image/upload/v1661401542/volume-high_rkxle8.svg'
              : volumen >= 1
              ? 'https://res.cloudinary.com/whil/image/upload/v1661401542/volume-low_rawzad.svg'
              : (volumen <= 0 &&
                  'https://res.cloudinary.com/whil/image/upload/v1661401542/volume-cross_rlev1s.svg') ||
                ''
          }
          width="22px"
          height="22px"
          customCSS={css`
            svg {
              path {
                stroke: white;
              }
            }
          `}
        />
      </AtomButton>
      <AtomInput
        id="volumen"
        type="range"
        placeholder="Search"
        min="0"
        value={volumen}
        onBlur={(e: ChangeEvent<HTMLInputElement>) => {
          //   if (audio.current) {
          //     audio.current.volume = Number(e.target.value) / 100;
          //   }
          setvolumen(Number(e.target.value));
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //   if (audio.current) {
          //     audio.current.volume = Number(e.target.value) / 100;
          //   }
          //   setvolumen(Number(e.target.value));
          setvolumen(Number(e.target.value));
        }}
        customCSS={css`
          width: 150px;
          height: 6px;
          outline: none;
          grid-column: 2;
          outline: none;
          -webkit-appearance: none;
          background: rgb(92 86 86 / 60%);
          border: none;
          border-radius: 5px;
          background-image: linear-gradient(
            ${colors?.[0]?.hex},
            ${colors?.[0]?.hex}
          );
          background-repeat: no-repeat;
          background-size: ${volumen}% 100%;
          ::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background: ${colors?.[0]?.hex};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          ::-moz-range-thumb {
            -webkit-appearance: none;
            height: 20px;
            border-radius: 50%;
            background: ${colors?.[0]?.hex};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          ::-ms-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${colors?.[0]?.hex};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          ::-webkit-slider-thumb:hover {
            background: ${colors?.[0]?.hex};
          }
          ::-moz-range-thumb:hover {
            background: ${colors?.[0]?.hex};
          }
          ::-ms-thumb:hover {
            background: ${colors?.[0]?.hex};
          }

          ::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
          }
          ::-moz-range-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
          }
          ::-ms-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
          }
        `}
      />
    </>
  );
};

export default AtomVolumenPlayer;

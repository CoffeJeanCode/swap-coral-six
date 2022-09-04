/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import useTimer, { timerAtom } from '@Hooks/useTimer';
import useIframe from '@Utils/useRefIframe';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomInput from '../AtomInput';
import { SHOWPLAYERIFRAME_ATOM } from '../AtomPlayer';
import AtomWrapper from '../Atomwrapper';

export const PLAY_IFRAME_ATOM = atom(false);

const AtomPlayerIframe: FC = () => {
  const [playIFRAME, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);
  const setSpotify = useSetAtom(SHOWPLAYERIFRAME_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [currentTime, setCurrentTime] = useAtom(timerAtom);
  const colors = useAtomValue(COLORS_ATOM);
  const spotifyEmbedWindow = useIframe();

  const CURRTRACK = (controls?.currentTrack?.duration_ms as number) / 1000;
  useTimer({
    ms: 1000,
    start: 0,
    end: CURRTRACK,
    play: playIFRAME,
    repeat: controls?.controls?.repeat,
    onCompleted: (returnCOn) => {
      if (returnCOn?.controls?.repeat) {
        setCurrentTime(0);
        setPlayIFRAME(true);
        dispatch({
          type: 'CHANGE_TRACK',
          payload: {
            currentTrack: {
              track_number:
                (returnCOn?.currentTrack?.track_number as number) + 1
            }
          }
        });
      } else {
        setCurrentTime(0);
        setPlayIFRAME(false);
      }
    }
  });

  return (
    <AtomWrapper
      customCSS={css`
        padding: 10px;
        grid-column: 1 / -1;
        grid-row: 2;
        background-color: #191922;
        display: grid;
        grid-template-columns: 1fr 1fr 500px;
        grid-template-rows: auto;
        gap: 10px;
        @media (max-width: 980px) {
          grid-template-columns: 1fr auto;
          padding: 0 15px 15px 15px;
        }
      `}
    >
      <AtomWrapper>
        <iframe
          src={`https://open.spotify.com/embed/track/${controls?.currentTrack?.id}?utm_source=generator`}
          width="100%"
          height="100px"
          id="IFRAMEPLAYER"
          frameBorder="0"
          style={{ gridColumn: '1 / 3' }}
          allowTransparency
          allow="encrypted-media"
        ></iframe>
        <AtomInput
          id="player-reproductor"
          type="range"
          min="0"
          max={Math.floor(CURRTRACK)}
          value={currentTime}
          onClick={(event: any) => {
            const timeDuration = Number(event.target.value);

            setCurrentTime(Number(event.target.value));
            spotifyEmbedWindow.postMessage(
              {
                command: 'seek',
                timestamp: timeDuration
              },
              '*'
            );
          }}
          onChange={(event) => {
            setCurrentTime(Number(event.target.value));
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
                ((currentTime * 100) / CURRTRACK || 0) as number as number
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
      </AtomWrapper>
      <AtomWrapper>
        <AtomWrapper
          flexDirection="row"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              setSpotify(false);
            }}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661924056/spotify_white_ih7an5.svg"
              width="22px"
              height="22px"
              color="default"
              customCSS={css`
                svg {
                  path {
                    fill: #1ed760;
                  }
                }
              `}
            />
            Go back
          </AtomButton>
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              dispatch({
                type: 'SET_REPEAT',
                payload: {}
              });
            }}
            customCSS={css`
              @media (max-width: 980px) {
                display: none;
              }
            `}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661401540/repeatt_yet17i.svg"
              width="22px"
              height="22px"
              customCSS={css`
                svg {
                  path {
                    stroke: ${controls.controls?.repeat
                      ? colors?.[0]?.hex
                      : 'white'};
                  }
                }
              `}
            />
          </AtomButton>
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              // spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
              setCurrentTime(0);
              setPlayIFRAME(true);
              dispatch({
                type: 'CHANGE_TRACK',
                payload: {
                  currentTrack: {
                    track_number:
                      (controls?.currentTrack?.track_number as number) - 1
                  }
                }
              });
            }}
            customCSS={css`
              @media (max-width: 980px) {
                display: none;
              }
            `}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661401539/previous_sqclao.svg"
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
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              setPlayIFRAME((prev) => !prev);
              spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
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
              icon={
                playIFRAME
                  ? 'https://res.cloudinary.com/whil/image/upload/v1661674261/pause-circle_yw7s3n.svg'
                  : 'https://res.cloudinary.com/whil/image/upload/v1661674252/play-circle_tq6brv.svg'
              }
            />
          </AtomButton>
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={async () => {
              setCurrentTime(0);
              setPlayIFRAME(true);
              dispatch({
                type: 'CHANGE_TRACK',
                payload: {
                  currentTrack: {
                    track_number:
                      (controls?.currentTrack?.track_number as number) + 1
                  }
                }
              });
            }}
            customCSS={css`
              @media (max-width: 980px) {
                display: none;
              }
            `}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661401538/next_mudtaa.svg"
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
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default AtomPlayerIframe;

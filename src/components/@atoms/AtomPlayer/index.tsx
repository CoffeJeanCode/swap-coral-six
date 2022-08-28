import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomImage from '../AtomImage';
import AtomPlayerProgressBar from '../AtomPlayerProgressBar';
import AtomPlayPlayer from '../AtomPlayPlayer';
import { AtomText } from '../AtomText';
import AtomVolumenPlayer from '../AtomVolumenPlayer';
import AtomWrapper from '../Atomwrapper';

const AtomPlayer: FC = () => {
  const colors = useAtomValue(COLORS_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const router = useRouter();

  return (
    <AtomWrapper
      customCSS={css`
        padding: 10px;
        grid-column: 1 / -1;
        grid-row: 2;
        background-color: #191922;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 10px;
        @media (max-width: 980px) {
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          padding: 0 15px 15px 15px;
        }
      `}
    >
      <AtomWrapper
        customCSS={css`
          grid-column: 1 / 2;
          display: grid;
          grid-template-rows: 40px 40px;
          grid-template-columns: auto 1fr;
          grid-column-gap: 10px;
          @media (max-width: 980px) {
            grid-template-rows: auto;
            grid-row: 2;
            grid-column: 1 / 2;
          }
        `}
      >
        <AtomWrapper
          customCSS={css`
            width: 80px;
            grid-row: 1 /-1;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomButton
            padding="0px"
            width="100%"
            height="100%"
            backgroundColor="transparent"
            onClick={() => {
              // dispatch({
              //   type: 'VIEWIMAGESIDEBAR',
              //   payload: {
              //     view: !controls.view,
              //     image: controls?.player?.currentTrack?.image
              //   }
              // });
            }}
          >
            <AtomImage
              src={controls?.currentTrack?.images?.[0]?.url as string}
              alt={controls?.currentTrack?.images?.[0]?.url as string}
              borderRadius="10px"
              width="100%"
              height="100%"
              customCSS={css`
                grid-row: 1 / -1;
              `}
            />
          </AtomButton>
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            grid-column: 2;
            grid-row: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
          `}
        >
          <AtomButton
            width="max-content"
            padding="0px"
            backgroundColor="transparent"
            customCSS={css`
              &:hover {
                text-decoration: underline;
              }
            `}
            onClick={() => {
              router
                .push({
                  pathname: `/public/album/[id]`,
                  query: {
                    id: controls?.currentTrack?.album?.id
                  }
                })
                .then(() => {
                  document?.getElementById('view')?.scroll({
                    top: 0
                  });
                });
            }}
          >
            <AtomText
              as="p"
              color="white"
              customCSS={css`
                grid-column: 2;
                grid-row: 1;
                align-self: center;
                @media (max-width: 980px) {
                  grid-row: 1;
                  grid-column: 1;
                  font-size: 1rem;
                }
              `}
            >
              {controls?.currentTrack?.name ?? ''}
            </AtomText>
          </AtomButton>
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              const isVideoPage = router.asPath.includes('video');

              if (isVideoPage) {
                router.back();
              }
              router.push({
                pathname: `/public/video/[id]`,
                query: {
                  id: controls?.currentTrack?.id
                }
              });
            }}
          >
            <AtomIcon
              width="25px"
              height="25px"
              customCSS={css`
                svg {
                  path {
                    stroke: white;
                  }
                }
              `}
              icon={
                router.asPath.includes('video')
                  ? 'https://res.cloudinary.com/whil/image/upload/v1661706864/PREVVIDEO_icmtkr.svg'
                  : 'https://res.cloudinary.com/whil/image/upload/v1661706864/TOVIDEO_j3jb2e.svg'
              }
            />
          </AtomButton>
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            grid-row: 2;
            align-self: center;
            @media (max-width: 980px) {
              grid-column: 2;
              grid-row: 1;
            }
          `}
        >
          <AtomWrapper flexDirection="row" justifyContent="flex-start">
            {controls?.currentTrack?.artists?.map((item, index) => (
              <AtomButton
                key={item?.id}
                padding="0px"
                color="white"
                backgroundColor="transparent"
                customCSS={css`
                  &:hover {
                    text-decoration: underline;
                  }
                `}
                onClick={() => {
                  router
                    .push({
                      pathname: `/public/artist/[id]`,
                      query: {
                        id: item?.id
                      }
                    })
                    .then(() => {
                      document?.getElementById('view')?.scroll({
                        top: 0,
                        behavior: 'smooth'
                      });
                    });
                }}
              >
                {index === 0 ? item?.name : `, ${item?.name}`}
              </AtomButton>
            ))}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
      <AtomWrapper justifyContent="center">
        <AtomWrapper
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            customCSS={css`
              @media (max-width: 980px) {
                display: none;
              }
            `}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661632351/aleatory_fql0tl.svg"
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
          <AtomPlayPlayer />
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
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
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              //   dispatch({
              //     type: 'REPEAT',
              //     payload: {
              //       repeat: !controls.repeat
              //     }
              //   });
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
                    stroke: white;
                  }
                }
              `}
            />
          </AtomButton>
        </AtomWrapper>
        <AtomPlayerProgressBar />
      </AtomWrapper>
      <AtomWrapper
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        customCSS={css`
          grid-column: 3 / 4;
          gap: 15px;
          @media (max-width: 980px) {
            display: none;
          }
        `}
      >
        <AtomButton
          backgroundColor="transparent"
          padding="0px"

          //   onClick={() => {
          //     router?.asPath?.includes('/lyric')
          //       ? router.back()
          //       : router
          //           ?.push({
          //             pathname: '/swap/lyric/[id]',
          //             query: {
          //               id: controls?.player?.currentTrack?.idTrack
          //             }
          //           })
          //           .then(() => {
          //             document?.getElementById('view')?.scroll({
          //               top: 0,
          //               behavior: 'smooth'
          //             });
          //           });
          //   }}
        >
          <AtomIcon
            icon="https://res.cloudinary.com/whil/image/upload/v1661655095/microphone_pnd062.svg"
            width="22px"
            height="22px"
            color={
              router?.asPath?.includes('/lyric')
                ? (colors[0]?.hex as string)
                : 'white'
            }
          />
        </AtomButton>
        <AtomButton
          padding="0px"
          backgroundColor="transparent"
          onClick={() => {
            router.asPath.includes('/queue')
              ? router.back()
              : router.push('/swap/queue').then(() => {
                  document?.getElementById('view')?.scroll({
                    top: 0,
                    behavior: 'smooth'
                  });
                });
          }}
          customCSS={css`
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomIcon
            icon="https://res.cloudinary.com/whil/image/upload/v1661401538/music-filter_pfws7j.svg"
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
        <AtomVolumenPlayer />
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default AtomPlayer;

import { useQuery } from '@apollo/client';
import { audioById } from '@Apollo/client/query/audioById';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { IQueryFilter } from '@Types/index';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomImage from '../AtomImage';
import AtomPlayerIframe from '../AtomPlayerIframe';
import AtomPlayerProgressBar from '../AtomPlayerProgressBar';
import AtomPlayPlayer from '../AtomPlayPlayer';
import { AtomText } from '../AtomText';
import { VIEWIMAGESIDEBAR_ATOM } from '../AtomViewImageSidebar';
import AtomVolumenPlayer from '../AtomVolumenPlayer';
import AtomWrapper from '../Atomwrapper';

export const SHOWPLAYERIFRAME_ATOM = atom(true);
const AtomPlayer: FC = () => {
  const [showPlayerSPotify, setSpotify] = useAtom(SHOWPLAYERIFRAME_ATOM);
  const colors = useAtomValue(COLORS_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [viewImageSidebar, setViewImageSideBar] = useAtom(
    VIEWIMAGESIDEBAR_ATOM
  );
  const router = useRouter();

  const { data, loading } = useQuery<IQueryFilter<'audioById'>>(audioById, {
    skip: !controls?.currentTrack?.id,
    fetchPolicy: 'cache-and-network',
    variables: {
      id: controls?.currentTrack?.id
    }
  });

  return (
    <>
      {showPlayerSPotify ? (
        <AtomPlayerIframe />
      ) : (
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
            {!viewImageSidebar && (
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
                    setViewImageSideBar(true);
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
            )}
            <AtomWrapper
              customCSS={css`
                grid-column: ${viewImageSidebar ? '1' : '2'};
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
              {loading ? (
                <AtomWrapper
                  customCSS={css`
                    border: 4px solid #f3f3f3;
                    border-radius: 50%;
                    border-top: 4px solid ${colors?.[0]?.hex};
                    width: 30px;
                    height: 30px;
                    -webkit-animation: spin 2s linear infinite; /* Safari */
                    animation: spin 2s linear infinite;

                    /* Safari */
                    @-webkit-keyframes spin {
                      0% {
                        -webkit-transform: rotate(0deg);
                      }
                      100% {
                        -webkit-transform: rotate(360deg);
                      }
                    }

                    @keyframes spin {
                      0% {
                        transform: rotate(0deg);
                      }
                      100% {
                        transform: rotate(360deg);
                      }
                    }
                  `}
                />
              ) : (
                <AtomPlayPlayer />
              )}
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
            </AtomWrapper>
            <AtomPlayerProgressBar data={data} loading={loading} />
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
              onClick={() => {
                setSpotify(!showPlayerSPotify);
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
            </AtomButton>
            <AtomButton
              backgroundColor="transparent"
              padding="0px"
              onClick={() => {
                router?.asPath?.includes('/lyric')
                  ? router.back()
                  : router
                      ?.push({
                        pathname: '/public/lyric/[id]',
                        query: {
                          id: controls?.currentTrack?.id
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
      )}
    </>
  );
};

export default AtomPlayer;

/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import UseColor from '@Hooks/useColor';
import useTime from '@Hooks/useTime';
import { IAlbumType, IArtist, ISong } from '@Types/index';
import convertDateWithOptions from '@Utils/convertDateWithOptions';
import convertWithCommas from '@Utils/numberWithCommas';
import { useRouter } from 'next/router';
import { FC } from 'react';
import AtomButton from '../AtomButton';
import AtomImage from '../AtomImage';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

// type PropsWithTypes<T> = T & {
//   color: string;
// };

const typeBanners = {
  artist: (props: AtomProps) => {
    const color = UseColor(props.artist?.images?.[0]?.url as string);
    return (
      <AtomWrapper
        id="background-dynamic-color"
        justifyContent="center"
        customCSS={css`
          min-height: 500px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${color?.[0]?.hex};
          @media (max-width: 980px) {
            justify-content: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          width="1440px"
          gap="20px"
          padding="0px 90px"
          customCSS={css`
            @media (max-width: 980px) {
              padding: 0px 30px;
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomImage
            src={props?.artist?.images?.[0]?.url as string}
            width="260px"
            height="260px"
            alt={props?.artist?.name as string}
            borderRadius="50%"
          />
          <AtomWrapper
            customCSS={css`
              max-width: 100%;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
                display: flex;
                align-items: center;
              }
            `}
          >
            <AtomText
              as="p"
              fontWeight="bold"
              color="white"
              fontSize="16px"
              customCSS={css`
                @media (max-width: 778px) {
                  text-align: center;
                }
              `}
            >
              {props?.type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              color="white"
              id="headerBarScrollTitle"
              fontWeight="bold"
              fontSize="26px"
              customCSS={css`
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
              `}
            >
              {props?.artist?.name}
            </AtomText>
            {props?.artist?.followers && (
              <AtomText as="p" color="white" opacity="0.5" fontSize="18px">
                {convertWithCommas(props?.artist?.followers?.total as number)}
              </AtomText>
            )}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    );
  },
  album: (props: AtomProps) => {
    const router = useRouter();
    const color = UseColor(props?.album?.images?.[0]?.url as string);
    return (
      <AtomWrapper
        id="background-dynamic-color"
        justifyContent="center"
        customCSS={css`
          min-height: 500px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${color?.[0]?.hex};
          @media (max-width: 980px) {
            justify-content: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          width="1440px"
          gap="20px"
          padding="0px 90px"
          customCSS={css`
            @media (max-width: 980px) {
              padding: 0px 30px;
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomImage
            src={props?.album?.images?.[0]?.url as string}
            width="260px"
            height="260px"
            alt={props?.album?.name as string}
            borderRadius="10px"
          />
          <AtomWrapper
            customCSS={css`
              max-width: 100%;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
                display: flex;
                align-items: center;
              }
            `}
          >
            <AtomText
              as="p"
              fontWeight="bold"
              color="white"
              fontSize="16px"
              customCSS={css`
                @media (max-width: 778px) {
                  text-align: center;
                }
              `}
            >
              {props?.album?.album_type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              color="white"
              id="headerBarScrollTitle"
              fontWeight="bold"
              fontSize="26px"
              customCSS={css`
                cursor: text;
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
              `}
            >
              {props?.album?.name}
            </AtomText>
            <AtomWrapper flexDirection="row" gap="5px">
              <AtomWrapper flexDirection="row">
                {props?.album?.artists?.map((item, index) => (
                  <AtomButton
                    key={item?.id}
                    backgroundColor="transparent"
                    padding="0px"
                    fontSize="16px"
                    fontWeight="bold"
                    onClick={() => {
                      router.push({
                        pathname: '/public/artist/[id]',
                        query: {
                          id: item?.id
                        }
                      });
                    }}
                  >
                    {index === 0 ? item?.name : `, ${item?.name}`}
                  </AtomButton>
                ))}{' '}
              </AtomWrapper>
              <AtomText color="white" fontSize="16px" fontWeight="bold">
                {convertDateWithOptions(
                  props?.album?.release_date as string,
                  'en-US',
                  {
                    year: 'numeric'
                  }
                )}{' '}
                • {props?.album?.total_tracks || 0} Tracks -{' '}
                {useTime({
                  tracks: props?.album?.tracks?.items as ISong[]
                })}
              </AtomText>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    );
  }
};

type AtomProps = {
  type: keyof typeof typeBanners;
  artist?: IArtist;
  album?: IAlbumType;
};

const AtomBanner: FC<AtomProps> = (props) => {
  return typeBanners[props.type as keyof typeof typeBanners](props);
};

export default AtomBanner;

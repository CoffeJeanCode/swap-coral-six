import { useQuery } from '@apollo/client';
import { LYRICBYTRACKID } from '@Apollo/client/query/lyricById';
import AtomImage from '@Components/@atoms/AtomImage';
import { PLAY_TRACK_ATOM } from '@Components/@atoms/AtomPlayPlayer';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import useSetRef from '@Hooks/useSetRef';
import { ILyric, IQueryFilter } from '@Types/index';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react';
import { PROGRESSBAR_ATOM } from '_jotai/player';
// import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
export const VIDEOREF_ATOM = atom(
  {} as MutableRefObject<HTMLVideoElement | undefined>
);

const VideoPublic: NextPageFC<{ id: string }> = ({ id }) => {
  // const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const playSong = useAtomValue(PLAY_TRACK_ATOM);
  const playerAudioTime = useAtomValue(PROGRESSBAR_ATOM);
  const videoref = useRef<HTMLVideoElement>();
  const setVideoRef = useSetAtom(VIDEOREF_ATOM);
  useSetRef<MutableRefObject<HTMLVideoElement | undefined>>(
    videoref as any,
    setVideoRef
  );
  const fixTimeVideo = Math.round(videoref?.current?.currentTime as number);

  const { data: DataLyric } = useQuery<IQueryFilter<'lyricByTrackId'>>(
    LYRICBYTRACKID,
    {
      skip: !id,
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          id: id
        }
      }
    }
  );

  useEffect(() => {
    if (videoref.current) {
      if (playSong) {
        videoref.current.play();
        if (fixTimeVideo !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime;
        }
      } else {
        if (fixTimeVideo !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime;
        }
        videoref.current.pause();
      }
    }
  }, [videoref?.current?.currentTime, playerAudioTime]);

  useEffect(() => {
    if (videoref.current) {
      if (playSong) {
        videoref.current.play();
        if (fixTimeVideo !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime;
        }
      } else {
        if (fixTimeVideo !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime;
        }
        videoref.current.pause();
      }
    }
  }, [playSong]);
  return (
    <AtomWrapper
      height="100%"
      customCSS={css`
        position: relative;
        display: flex;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr 570px;
      `}
    >
      <AtomWrapper
        height="100%"
        customCSS={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          position: relative;
          height: 100%;
          overflow: hidden;
          /* width: 100%; */
          video {
            width: 100%;
            height: 100%;
            float: left;
            object-fit: cover;
          }
        `}
      >
        <AtomWrapper
          customCSS={css`
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
          `}
        >
          <AtomWrapper
            customCSS={css`
              border: 1px solid white;
              position: absolute;
              width: 93%;
              height: 93%;
            `}
          ></AtomWrapper>
        </AtomWrapper>

        <video
          width="100%"
          height="100%"
          ref={videoref as LegacyRef<HTMLVideoElement>}
          autoPlay
        >
          {/* <source
            src={
              controls?.currentTrack?.youtube_video ??
              'https://rr4---sn-upbvbu-b05y.googlevideo.com/videoplayback?expire=1659095222&ei=VnTjYrviKsSU4QSRr77oCQ&ip=181.174.106.181&id=o-ANvL2CvY8iROhbGbFKflCdzkemawfTWA4RjN4Vechvqi&itag=313&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313%2C394%2C395%2C396%2C397%2C398%2C399%2C400%2C401&source=youtube&requiressl=yes&mh=b-&mm=31%2C29&mn=sn-upbvbu-b05y%2Csn-hp57yne7&ms=au%2Crdu&mv=m&mvi=4&pl=24&initcwndbps=972500&spc=lT-KhuJis3XLi9YOR8GjGeBOrv8vd1k&vprv=1&mime=video%2Fwebm&ns=Hop2_S5gNdbi7zKeUUSQb8cH&gir=yes&clen=383310106&dur=189.021&lmt=1652279494610048&mt=1659073258&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&txp=4532434&n=Q_yZNyAAdl-E9A&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgeKZ07AfcQGrPl246jHF7flNEd01uNrmsEZEx9T7I9dUCIQCSWv2ItjJtZLpkt6tiNDtR-yEpZ21Wt3TM6QYEwcfkfA%3D%3D&sig=AOq0QJ8wRAIgJP2SW6D8ImN_jIM_IEjVeYvHSKnT4y18WQk-04KFUaoCIANdeIiw83-vTxysfUC9htwX123vxxBHg7ZVhiAMMo6y'
            }
          /> */}
        </video>
      </AtomWrapper>
      <AtomWrapper
        customCSS={css`
          background-color: #f9f9f9;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          justify-content: flex-end;
          bottom: 0;
          right: 0;
          height: 100%;
          padding: 20px;
        `}
      >
        {' '}
        <AtomText margin="0px 0px 3% 0px">
          {[
            {
              id: '1',
              phrase: `${
                DataLyric?.lyricByTrackId?.name
              } - ${DataLyric?.lyricByTrackId?.artists?.map((item, index) =>
                index === 0 ? item?.name : `, ${item?.name}`
              )}`,
              start: 1,
              artists: [
                {
                  id: '1',
                  image:
                    'https://media-exp1.licdn.com/dms/image/C4E03AQEPWWq5AfJaJg/profile-displayphoto-shrink_800_800/0/1652553874624?e=1666828800&v=beta&t=_iJr0M3b5-rChJV8-vWhtpWOWpT5ulGbdYFyzIogU0g',
                  color: '#0271fe',
                  name: 'Whil'
                }
              ]
            } as ILyric,
            ...(DataLyric?.lyricByTrackId?.lyrics ?? [])
          ]
            ?.filter(
              (item) => (item?.start && playerAudioTime >= item?.start) ?? 0
            )
            ?.map((item) => (
              <AtomWrapper
                key={item?.id}
                customCSS={css`
                  margin: 25px 0px;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  gap: 10px;
                `}
              >
                <AtomWrapper
                  gap="20px"
                  customCSS={css`
                    display: flex;
                  `}
                >
                  {item?.artists?.map((artist) => (
                    <AtomImage
                      key={artist?.id}
                      src={artist?.image as string}
                      alt={artist?.name as string}
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                    />
                  ))}
                </AtomWrapper>
                <AtomWrapper
                  customCSS={css`
                    padding: 20px;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    border-radius: 10px;
                    max-width: 420px;
                    min-height: 75px;
                  `}
                >
                  <AtomWrapper>
                    {item?.artists?.map((artist, index) => (
                      <AtomText
                        key={artist?.id}
                        color={artist?.color}
                        fontWeight="bold"
                        fontSize="18px"
                      >
                        {index === 0 ? artist?.name : `, ${artist?.name}`}
                      </AtomText>
                    ))}
                  </AtomWrapper>
                  <AtomText
                    color={item?.artists?.[0]?.color}
                    fontSize="20px"
                    margin="15px 0px 0px"
                  >
                    {item?.phrase} <br />
                  </AtomText>
                </AtomWrapper>
              </AtomWrapper>
            ))}
        </AtomText>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  return {
    props: {
      id
    }
  };
}

VideoPublic.Layout = 'public';

export default VideoPublic;

import { useQuery } from '@apollo/client';
import client from '@Apollo/client/notWSS';
import { LYRICBYTRACKID } from '@Apollo/client/query/lyricById';
import AtomLoader from '@Components/@atoms/AtomLoader';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import UseColor from '@Hooks/useColor';
import { IQueryFilter } from '@Types/index';
import { useAtomValue } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const LyricByID: NextPageFC<{ id: string }> = ({ id }) => {
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const color = UseColor(controls?.currentTrack?.images?.[0]?.url as string);
  const { data, loading } = useQuery<IQueryFilter<'lyricByTrackId'>>(
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

  return (
    <AtomWrapper
      backgroundColor={color?.[0]?.hex as string}
      width="100%"
      height={loading ? '100%' : 'auto'}
    >
      <AtomWrapper
        padding="45px"
        height={loading ? '100%' : 'auto'}
        customCSS={css`
          display: flex;
          flex-direction: ${loading ? 'row' : 'column'};
          justify-content: center;
          align-items: ${loading ? 'center' : 'flex-start'};
        `}
      >
        {loading ? (
          <AtomLoader type="small" colorLoading="white" isLoading />
        ) : (
          <>
            <AtomWrapper flexDirection="row" alignItems="center" gap="10px">
              {data?.lyricByTrackId?.artists?.map((item, index) => (
                <AtomText
                  key={item?.id}
                  fontWeight="bold"
                  fontSize="30px"
                  color="white"
                >
                  {index === 0 ? item?.name : `, ${item?.name}`}
                </AtomText>
              ))}
              <AtomText fontWeight="bold" fontSize="30px" color="white">
                {data?.lyricByTrackId?.name}
              </AtomText>
            </AtomWrapper>

            {data?.lyricByTrackId?.lyrics?.map((item) => (
              <AtomWrapper
                key={item?.id}
                customCSS={css`
                  margin-top: 20px;
                  font-family: 'Open Sans', sans-serif;
                  font-size: 2rem;
                  display: flex;
                  flex-direction: column;
                `}
              >
                <AtomText
                  fontSize="30px"
                  color="black"
                  customCSS={css`
                    color: white;
                  `}
                >
                  {item?.phrase}
                </AtomText>
              </AtomWrapper>
            ))}

            <AtomText fontSize="13px">Whil Inc.</AtomText>
          </>
        )}
      </AtomWrapper>
    </AtomWrapper>
  );
};

LyricByID.Layout = 'public';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  const lyric = await client
    .query<IQueryFilter<'lyricByTrackId'>>({
      query: LYRICBYTRACKID,
      variables: {
        filter: {
          id: id
        }
      }
    })
    ?.then((res) => res.data?.lyricByTrackId);
  LyricByID.SEO = {
    title: `${lyric?.name} - ${lyric?.artists
      ?.map((item) => item?.name)
      .join(' ,')}`,
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Lyrics is avaible now!`,
    keywords: ['swapcoralsix', 'Feed']
  };

  return {
    props: {
      id
    }
  };
}

export default LyricByID;

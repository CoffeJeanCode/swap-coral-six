import { useQuery } from '@apollo/client';
import { PLAYLISTBYID } from '@Apollo/client/query/playlistById';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IImage, IQueryFilter, ISong } from '@Types/index';
import { useSetAtom } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const PlaylistPublic: NextPageFC<{ id: string }> = ({ id }) => {
  const dispatch = useSetAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);

  const { data } = useQuery<IQueryFilter<'playListById'>>(PLAYLISTBYID, {
    skip: !id,
    variables: {
      id: id
    }
  });
  return (
    <AtomWrapper>
      <AtomBanner type="album" album={data?.playListById} />
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
        {data?.playListById?.tracks?.items?.map((item) => (
          <AtomTrack
            type="album"
            key={item?.id}
            onPlay={() => {
              dispatch({
                type: 'SET_TRACK',
                payload: {
                  currentTrack: {
                    ...item,
                    // artists: data?.albumById?.artists,
                    album: item?.album,
                    images: item?.album?.images as IImage[]
                  },
                  context: data?.playListById?.tracks?.items?.map((item) => ({
                    ...item,
                    images: item?.album?.images as IImage[]
                  }))
                }
              });
            }}
            album={item as ISong}
          />
        ))}
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

PlaylistPublic.Layout = 'public';
export default PlaylistPublic;

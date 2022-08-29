import { useQuery } from '@apollo/client';
import { albumByID } from '@Apollo/client/query/albumByID';
import AtomBanner from '@Components/@atoms/AtomBanner';

import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IImage, IQueryFilter, ISong } from '@Types/index';
import { useSetAtom } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const AlbumPublic: NextPageFC<{ id: string }> = ({ id }) => {
  const dispatch = useSetAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);

  const { data } = useQuery<IQueryFilter<'albumById'>>(albumByID, {
    skip: !id,
    variables: {
      id: id
    }
  });
  return (
    <AtomWrapper>
      <AtomBanner type="album" album={data?.albumById} />
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
        {data?.albumById?.tracks?.items?.map((item) => (
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
                    images: data?.albumById?.images as IImage[],
                    album: data?.albumById
                  },
                  context: data?.albumById?.tracks?.items?.map((item) => ({
                    ...item,
                    album: data?.albumById,
                    images: data?.albumById?.images as IImage[]
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
AlbumPublic.Layout = 'public';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  return {
    props: {
      id
    }
  };
}

export default AlbumPublic;

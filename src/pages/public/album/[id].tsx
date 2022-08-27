import { useQuery } from '@apollo/client';
import { albumByID } from '@Apollo/client/query/albumByID';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IQueryFilter } from '@Types/index';
import { NextPageContext, NextPageFC } from 'next';

const AlbumPublic: NextPageFC<{ id: string }> = ({ id }) => {
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
        {data?.albumById?.tracks?.items?.map((item, index) => (
          <AtomTrack
            type="album"
            key={item?.id}
            album={{
              ...item,
              artists: data?.albumById?.artists,
              position: index
            }}
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

import { useQuery } from '@apollo/client';
import { ARTISTBYID } from '@Apollo/client/query/artistById';
import { LISTALBUMSBYARTISTID } from '@Apollo/client/query/listAlbums';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IQueryFilter } from '@Types/index';
import { NextPageContext, NextPageFC } from 'next';
import { useRouter } from 'next/router';

const PublicArtist: NextPageFC<{ id: string }> = (props) => {
  const router = useRouter();
  const { data } = useQuery<IQueryFilter<'artistById'>>(ARTISTBYID, {
    fetchPolicy: 'cache-and-network',
    skip: !props.id,
    variables: {
      id: props?.id
    }
  });
  const { data: ListAlbumsByArtist } = useQuery<IQueryFilter<'listAlbums'>>(
    LISTALBUMSBYARTISTID,
    {
      skip: !props.id,
      variables: {
        filter: {
          artist: {
            id: props?.id
          }
        }
      }
    }
  );

  return (
    <AtomWrapper width="100%">
      <AtomBanner type="artist" artist={data?.artistById ?? {}} />
      <AtomWrapper
        padding="45px 90px"
        maxWidth="1440px"
        flexDirection="row"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
          @media (max-width: 980px) {
            padding: 0px 30px;
          }
        `}
      >
        {ListAlbumsByArtist?.listAlbums?.map((item) => (
          <AtomCard
            key={item?.id}
            {...item}
            image={item?.images?.[0]?.url as string}
            type={item?.album_type}
            onClick={() => {
              router.push({
                pathname: '/public/album/[id]',
                query: {
                  id: item?.id
                }
              });
            }}
          />
        ))}
      </AtomWrapper>
    </AtomWrapper>
  );
};

PublicArtist.Layout = 'public';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  return {
    props: {
      id
    }
  };
}

export default PublicArtist;

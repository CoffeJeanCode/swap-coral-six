import { useQuery } from '@apollo/client';
import { albumByID } from '@Apollo/client/query/albumByID';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
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
      <h1>AlbumPublic</h1>
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

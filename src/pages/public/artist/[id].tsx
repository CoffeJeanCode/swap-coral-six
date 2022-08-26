import { useQuery } from '@apollo/client';
import { ARTISTBYID } from '@Apollo/client/query/artistById';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { IQueryFilter } from '@Types/index';
import { NextPageContext, NextPageFC } from 'next';

const PublicArtist: NextPageFC<{ id: string }> = (props) => {
  const { data } = useQuery<IQueryFilter<'artistById'>>(ARTISTBYID, {
    skip: !props.id,
    variables: {
      id: props?.id
    }
  });

  return (
    <AtomWrapper>
      <AtomBanner type="artist" artist={data?.artistById ?? {}} />
      <h1>PublicArtist</h1>
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

import { NextPageContext, NextPageFC } from 'next';

const PlaylistPublic: NextPageFC<{ id: string }> = ({ id }) => {
  return (
    <div>
      <h1>PlaylistPublic</h1>
      {id}
    </div>
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

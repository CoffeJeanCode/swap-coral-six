import { NextPageContext, NextPageFC } from 'next';

const VideoPublic: NextPageFC<{ id: string }> = ({ id }) => {
  return (
    <div>
      <h1>VideoPublic</h1>
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

VideoPublic.Layout = 'public';

export default VideoPublic;

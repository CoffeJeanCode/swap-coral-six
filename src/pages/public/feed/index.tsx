import { useQuery } from '@apollo/client';
import { LISTBYTYPE } from '@Apollo/client/query/listByType';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IQueryFilter } from '@Types/index';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';

const Public: NextPageFCProps = () => {
  const router = useRouter();
  const { data } = useQuery<IQueryFilter<'listByType'>>(LISTBYTYPE, {
    variables: {
      type: ['artists'],
      limit: 50
    }
  });

  return (
    <AtomWrapper>
      <AtomWrapper
        padding="25px"
        maxWidth="1440px"
        flexDirection="row"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
        `}
      >
        {data?.listByType?.artists?.map((props) => (
          <>
            <AtomCard
              key={props?.id}
              {...props}
              image={props?.images?.[0]?.url as string}
              onClick={() => {
                router.push({
                  pathname: '/public/artist/[id]',
                  query: {
                    id: props?.id
                  }
                });
              }}
            />
          </>
        ))}
      </AtomWrapper>
      <video
        src="blob:http://www.youtube.com/v/LKsgDcckur0?version=3&autohide=1"
        controls
      ></video>
    </AtomWrapper>
  );
};
export async function getServerSideProps() {
  return {
    props: {}
  };
}
Public.Layout = 'public';

export default Public;

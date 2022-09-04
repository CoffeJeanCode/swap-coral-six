import { useQuery } from '@apollo/client';
import { LISTBYTYPE } from '@Apollo/client/query/listByType';
import AtomCard from '@Components/@atoms/AtomCard';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IQueryFilter } from '@Types/index';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';

const Public: NextPageFCProps = () => {
  const router = useRouter();
  const { data } = useQuery<IQueryFilter<'listByType'>>(LISTBYTYPE, {
    variables: {
      type: ['artists', 'albums', 'playlist', 'tracks'],
      limit: 25
    }
  });

  return (
    <AtomWrapper>
      <AtomWrapper
        maxWidth="1440px"
        flexDirection="row"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
        `}
      >
        {typeSearch?.map((item) => (
          <>
            <AtomText color="white" fontWeight="bold">
              {item}
            </AtomText>
            <AtomWrapper
              width="100%"
              flexDirection="row"
              flexWrap="wrap"
              customCSS={css`
                display: flex;
                gap: 10px;
              `}
            >
              {data?.listByType?.[item as keyof typeof data.listByType]?.map(
                (props) => (
                  <AtomCard
                    key={props?.id}
                    {...props}
                    image={props?.images?.[0]?.url as string}
                    onClick={() => {
                      router.push({
                        pathname: `/public/${props?.type}/[id]`,
                        query: {
                          id: props?.id
                        }
                      });
                    }}
                  />
                )
              )}
            </AtomWrapper>
          </>
        ))}
      </AtomWrapper>
    </AtomWrapper>
  );
};
const typeSearch = ['artists', 'albums', 'playlist'];

export async function getServerSideProps() {
  return {
    props: {}
  };
}
Public.Layout = 'public';

export default Public;

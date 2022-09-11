import { useQuery } from '@apollo/client';
import { LISTBYTYPE } from '@Apollo/client/query/listByType';
import AtomButton from '@Components/@atoms/AtomButton';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomLoader from '@Components/@atoms/AtomLoader';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IQueryFilter } from '@Types/index';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Public: NextPageFCProps = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data, refetch } = useQuery<IQueryFilter<'listByType'>>(LISTBYTYPE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      type: ['artists', 'albums', 'playlist', 'tracks'],
      limit: 24
    },
    onCompleted: () => {
      setLoading(false);
    }
  });

  return (
    <AtomWrapper width="100%">
      <AtomWrapper
        padding="25px"
        maxWidth="1440px"
        flexDirection="column"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
        `}
      >
        {loading ? (
          <AtomLoader type="small" isLoading colorLoading="white" />
        ) : (
          <>
            <AtomButton
              onClick={() => {
                refetch();
                setLoading(true);
              }}
            >
              Get More Data
            </AtomButton>
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
                  {data?.listByType?.[
                    item as keyof typeof data.listByType
                  ]?.map((props) => (
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
                  ))}
                </AtomWrapper>
              </>
            ))}
          </>
        )}
      </AtomWrapper>
    </AtomWrapper>
  );
};
const typeSearch = ['artists', 'albums', 'playlist'];

export async function getServerSideProps() {
  Public.SEO = {
    title: 'Feed',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Feed is avaible now!`,
    keywords: ['swapcoralsix', 'Feed']
  };

  return {
    props: {}
  };
}
Public.Layout = 'public';

export default Public;

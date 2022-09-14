import { useQuery } from '@apollo/client';
import { LISTBYTYPE } from '@Apollo/client/query/listByType';
import AtomButton from '@Components/@atoms/AtomButton';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IQueryFilter } from '@Types/index';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
type Props = {
  type: 'artists' | 'albums' | 'playlist';
};

const OrganismListByType: FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data, refetch } = useQuery<IQueryFilter<'listByType'>>(LISTBYTYPE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      type: [props.type],
      limit: 50
    },
    onCompleted: () => {
      setLoading(false);
    }
  });

  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page="Artists"
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'Artists']}
        description={`Swap Coral Six - Artists is avaible now!`}
      />
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
            {[props.type]?.map((item) => (
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

export default OrganismListByType;

import { useQuery } from '@apollo/client';
import { SEARCHQUERY } from '@Apollo/client/query/Search';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomInput from '@Components/@atoms/AtomInput';
import AtomLoader from '@Components/@atoms/AtomLoader';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import useTimer from '@Hooks/useTimer';
import { IQueryFilter } from '@Types/index';
import { atom, useAtom } from 'jotai';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';

const searchAtom = atom('');
const limitAtom = atom(10);
const wordAtom = atom('');

const SearchPage: NextPageFCProps = () => {
  const [search, setSearch] = useAtom(searchAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [word, setword] = useAtom(wordAtom);
  const router = useRouter();
  const { setTimer } = useTimer({
    callback: () => {
      setSearch(word);
    }
  });

  const { data, loading } = useQuery<IQueryFilter<'Search'>>(SEARCHQUERY, {
    skip: !search,
    variables: {
      filter: {
        slug: search,
        limit: limit
      }
    }
  });

  return (
    <AtomWrapper width="100%" height="100%">
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
        <AtomWrapper>
          <h1>SearchPage</h1>
          <AtomWrapper
            flexDirection="row"
            gap="20px"
            customCSS={css`
              display: grid;
              grid-template-columns: 1fr auto;
            `}
          >
            <AtomInput
              type="text"
              id="search"
              customCSS={css`
                width: 100%;
              `}
              onChange={(e) => {
                setTimer(0);
                setword(e.target.value);
              }}
            />
            <select
              onChange={(e) => setLimit(Number(e.target.value))}
              value={limit}
              style={{ width: 'auto' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          maxWidth="1440px"
          flexDirection="row"
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
              {typeSearch?.map((item) => (
                <>
                  {data?.Search?.[item as keyof typeof data.Search]?.length && (
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
                        {data?.Search?.[item as keyof typeof data.Search]?.map(
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
                  )}
                </>
              ))}
            </>
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

const typeSearch = ['artists', 'albums', 'playlists'];
SearchPage.Layout = 'public';
export default SearchPage;

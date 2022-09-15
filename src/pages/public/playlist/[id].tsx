import { useQuery } from '@apollo/client';
import client from '@Apollo/client/notWSS';
import { PLAYLISTBYID } from '@Apollo/client/query/playlistById';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomPlayByAlbumPlaylist, {
  getRandomTrack
} from '@Components/@atoms/AtomPlayByAlbum&Playlist';
import AtomSEO from '@Components/@atoms/AtomSeo';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import {
  IImage,
  IlistPlaylistsBySlug,
  IQueryFilter,
  ISong
} from '@Types/index';
import { useSetAtom } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const PlaylistPublic: NextPageFC<{ id: string }> = ({ id }) => {
  const dispatch = useSetAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);

  const { data, loading } = useQuery<IQueryFilter<'playListById'>>(
    PLAYLISTBYID,
    {
      skip: !id,
      variables: {
        id: id
      }
    }
  );
  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page={data?.playListById?.name}
        image={data?.playListById?.images?.[0]?.url}
        keywords={[data?.playListById?.name as string]}
        description={data?.playListById?.name}
      />
      {loading ? (
        <AtomLoader type="small" isLoading colorLoading="white" />
      ) : (
        <>
          <AtomBanner type="playlist" playlist={data?.playListById} />
          <AtomPlayByAlbumPlaylist
            context={data?.playListById as IlistPlaylistsBySlug}
            type="playlist"
            onDispatch={() => {
              const randomTrack = getRandomTrack(
                data?.playListById?.tracks?.items as ISong[]
              );
              dispatch({
                type: 'SET_TRACK',
                payload: {
                  currentTrack: {
                    ...randomTrack,
                    // artists: data?.albumById?.artists,
                    album: randomTrack?.album,
                    images: randomTrack?.album?.images as IImage[],
                    destination: {
                      type: 'playlist',
                      id: id
                    }
                  },
                  context: data?.playListById?.tracks?.items?.map((item) => ({
                    ...item,
                    images: item?.album?.images as IImage[],
                    destination: {
                      type: 'playlist',
                      id: id
                    }
                  }))
                }
              });
            }}
          />
          <AtomWrapper
            padding="45px 90px"
            maxWidth="1440px"
            flexDirection="row"
            flexWrap="wrap"
            customCSS={css`
              gap: 10px;
              @media (max-width: 980px) {
                padding: 0px 30px;
              }
            `}
          >
            {data?.playListById?.tracks?.items?.map((item) => (
              <AtomTrack
                type="album"
                key={item?.id}
                onPlay={() => {
                  dispatch({
                    type: 'SET_TRACK',
                    payload: {
                      currentTrack: {
                        ...item,
                        // artists: data?.albumById?.artists,
                        album: item?.album,
                        images: item?.album?.images as IImage[],
                        destination: {
                          type: 'playlist',
                          id: id
                        }
                      },
                      context: data?.playListById?.tracks?.items?.map(
                        (item) => ({
                          ...item,
                          images: item?.album?.images as IImage[],
                          destination: {
                            type: 'playlist',
                            id: id
                          }
                        })
                      )
                    }
                  });
                }}
                album={item as ISong}
              />
            ))}
          </AtomWrapper>
        </>
      )}
    </AtomWrapper>
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const artist = await client
    .query<IQueryFilter<'playListById'>>({
      query: PLAYLISTBYID,
      variables: {
        id: id
      }
    })
    ?.then((res) => res.data?.playListById);
  PlaylistPublic.SEO = {
    title: artist?.name,
    image: artist?.images?.[0]?.url,
    description: `Swap Coral Six - ${artist?.name} is avaible now!`,
    keywords: ['swapcoralsix', artist?.name as string]
  };

  return {
    props: {
      id
    }
  };
}

PlaylistPublic.Layout = 'public';
export default PlaylistPublic;

const Album = require('@Apollo/server/graphql/service/swap/album/models');
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { listAlbums } from '..';
import { ContextRoot } from '../../../types';

const listAlbumBySlug = async (
  _: any,
  { filter }: { filter: listAlbums },
  { spotifyAPIToken }: ContextRoot
) => {
  await spotifyAPIToken();
  const artistAlbums = await CONFIG_SPOTIFY.SPOTIFY_API.searchAlbums(
    filter?.slug,
    {
      limit: filter?.limit ?? 50,
      offset: filter?.offset ?? 0
    }
  ).then((res) => res.body.albums);

  for (const iterator of artistAlbums?.items ?? []) {
    const isExistAlbum = await Album.find({
      id: iterator?.id
    });
    if (!isExistAlbum) {
      const newAlbum = new Album({
        ...iterator
      });

      await newAlbum.save();
    }
  }
  return artistAlbums?.items;
};

export default listAlbumBySlug;

import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../../types';

const Artist = require('@Apollo/server/graphql/service/swap/artist/models');

type listArtistBySlug = {
  slug: string;
  limit?: number;
  offset: number;
};

const createArtists = async (artists: SpotifyApi.ArtistObjectFull[]) => {
  let result = [];
  for (const artist of artists ?? []) {
    result.push({
      external_urls: artist.external_urls,
      followers: artist.followers,
      genres: artist.genres,
      href: artist.href,
      id: artist.id,
      images: artist.images,
      name: artist.name,
      popularity: artist.popularity,
      type: artist.type,
      uri: artist.uri
    });
  }
  return result;
};

const listArtistBySlug = async (
  _: any,
  { filter }: { filter: listArtistBySlug },
  { spotifyAPIToken }: ContextRoot
) => {
  await spotifyAPIToken();
  const searchArtist = await CONFIG_SPOTIFY.SPOTIFY_API.searchArtists(
    filter.slug,
    {
      limit: filter?.limit ?? 50,
      offset: filter?.offset ?? 0
    }
  );

  const artistsResponse = searchArtist.body.artists?.items ?? [];
  const artists = await createArtists(artistsResponse);

  for (const artist of artists ?? []) {
    const isExistArtist = await Artist.findOne({
      id: artist.id
    })
      .select('id')
      .lean();

    if (isExistArtist === null) {
      const newArtist = new Artist(artist);
      await newArtist.save();
    }
  }
  return artists;
};

export default listArtistBySlug;

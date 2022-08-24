import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';

const Artist = require('@Apollo/server/graphql/service/swap/artist/models');

type listArtistBySlug = {
  slug: string;
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

const resolvers = {
  Query: {
    listArtistBySlug: async (
      _: any,
      { filter }: { filter: listArtistBySlug },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const artists = await Artist.find({ name: filter.slug }).exec();
      if (artists?.length === 0) {
        await spotifyAPIToken();
        const searchArtist = await CONFIG_SPOTIFY.SPOTIFY_API.search(
          filter.slug,
          ['artist'],
          {
            limit: 50
          }
        );

        const artistsResponse = searchArtist.body.artists?.items ?? [];
        const newArtistd = await createArtists(artistsResponse);

        for (const artist of newArtistd ?? []) {
          const isExistArtist = await Artist.findOne({
            id: artist.id
          });

          if (isExistArtist === null) {
            const newArtist = new Artist(artist);
            await newArtist.save();
          }
        }
        return artistsResponse;
      }
      return artists;
    },
    artistById: async (
      _: any,
      {
        id
      }: {
        id: string;
      },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const artist = await Artist.findOne({ id: id });

      if (!artist) {
        await spotifyAPIToken();
        const searchArtist = await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(
          id
        ).then((artist) => artist.body);
        const newArtist = await new Artist({
          ...searchArtist
        });
        await newArtist.save();
        return searchArtist;
      }
      return artist;
    }
  },

  Mutation: {}
};

export default resolvers;

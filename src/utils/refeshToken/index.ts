import { CONFIG_SPOTIFY } from 'config/spotify';

type SpotifyToken = {
  accessToken: string;
  refreshToken: string;
};

export default async function refeshToken(token: SpotifyToken) {
  try {
    CONFIG_SPOTIFY.SPOTIFY_API.setAccessToken(token.accessToken);
    CONFIG_SPOTIFY.SPOTIFY_API.setRefreshToken(token.refreshToken);
    const data = await CONFIG_SPOTIFY.SPOTIFY_API.refreshAccessToken();
    return {
      ...token,
      accessToken: data.body.access_token ?? token.accessToken,
      refreshToken: data.body.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.body.expires_in * 1000
    };
  } catch (error) {
    return {
      ...token,
      error: 'Refresh Token'
    };
  }
}

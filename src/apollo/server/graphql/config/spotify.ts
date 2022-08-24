import { CONFIG_SPOTIFY } from '@Config/spotify';
import axios from 'axios';

export const spotifyAPIToken = async () => {
  const res = await axios('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

      Authorization:
        'Basic ' +
        Buffer.from(
          CONFIG_SPOTIFY.CLIENT_ID + ':' + CONFIG_SPOTIFY.CLIENT_SECRET
        ).toString('base64')
    },
    data: 'grant_type=client_credentials'
  });
  if (res.status === 200) {
    CONFIG_SPOTIFY.SPOTIFY_API.setAccessToken(res.data.access_token);
    return res.data.access_token;
  }
  return '';
};

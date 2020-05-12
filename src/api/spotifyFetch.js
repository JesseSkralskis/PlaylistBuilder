let usersAccessToken = "";
const clientId = `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
const UriRedirect = "https://silly-wescoff-4d18fa.netlify.app";

const Spotify = {
  getAccessToken: function() {
    if (usersAccessToken.length > 0) {
      return usersAccessToken;
    } else if (
      window.location.href.match(/access_token=([^&]*)/) !== null &&
      window.location.href.match(/expires_in=([^&]*)/) !== null
    ) {
      usersAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];

      let expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => (usersAccessToken = ""), expirationTime * 1000);
      window.history.pushState(usersAccessToken, null, "/");
      return usersAccessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${UriRedirect}`;
    }
  },
  async search(term) {
    if (usersAccessToken.length > 0) {
      let token = usersAccessToken;

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const res = await response.json();

      if (res.tracks.items.length !== 0) {
        return res.tracks.items.map(track => ({
          ID: track.id,
          Name: track.name,
          Artist: track.artists[0].name,
          Album: track.album.name,
          URI: track.uri
        }));
      } else {
        return [];
      }
    } else {
      alert(" no token");
    }
  },

  async savePlaylist(uriArray, plName) {
    let token = usersAccessToken;
    let userId = "";

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const res = await response.json();
    userId = res.id;

    const nextResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name: plName })
      }
    );

    const nextRes = await nextResponse.json();
    let plId = nextRes.id;

    const thirdResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${plId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        method: "POST",

        body: JSON.stringify({ uris: uriArray })
      }
    );
    const thirdRes = await thirdResponse.json();
    const plId2 = thirdRes.snapshot_id;
    console.log(plId2);
  },
  async getPreviewUrl(trackId) {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${usersAccessToken}`
        }
      }
    );

    const res = await response.json();
    return {
      URL: res.preview_url,
      Id: res.id
    };
  }
};
export default Spotify;

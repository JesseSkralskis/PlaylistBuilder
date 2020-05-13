import React, { useState, useContext } from "react";
import TrackList from "./TrackList";
import PlaylistTracksContext from "../context/playlistTracks-context";
import Spotify from "../api/spotifyFetch";
import PlaylistStyles from "../styles/components/playlist.module.scss";

export default function Playlist({ isRemove }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleChange = e => setName(e.target.value);
  const { playlistTracks, dispatchPlaylistTracks } = useContext(
    PlaylistTracksContext
  );

  const handleSave = name => {
    const uris = playlistTracks.map(track => track.URI);
    if (uris.length !== 0 && name !== "") {
      Spotify.savePlaylist(uris, name);
      dispatchPlaylistTracks({
        type: "RESET_LIST"
      });

      setName("");
    } else {
      setError("There are no tracks or no name for the playlist");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className={PlaylistStyles.container}>
      <div className={PlaylistStyles.utilities}>
        <h1></h1>
        <input
          placeholder="Your Playlist Name Here"
          type="text"
          value={name}
          onChange={e => handleChange(e)}
        />

        <a style={{}} onClick={() => handleSave(name)}>
          <p>
            Save to
            <br /> Spotify{" "}
          </p>
        </a>
      </div>
      <div className={PlaylistStyles.tracklistWrapper}>
        {error !== "" && (
          <div className={PlaylistStyles.error}>
            {" "}
            <h2>{error}</h2>
          </div>
        )}{" "}
        <TrackList isRemove={isRemove} tracks={playlistTracks} />
      </div>
    </div>
  );
}

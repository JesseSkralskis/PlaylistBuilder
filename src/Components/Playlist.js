import React, { useState, useContext } from "react";
import TrackList from "./TrackList";
import PlaylistTracksContext from "../context/playlistTracks-context";
import Spotify from "../api/spotifyFetch";
import PlaylistStyles from "../styles/components/playlist.module.scss";

export default function Playlist({ isRemove }) {
  const [name, setName] = useState({ playlistName: "" });
  const handleChange = e => setName(e.target.value);
  const {
    playlistTracks,
    playlistName,
    dispatchPlaylistName,
    dispatchPlaylistTracks
  } = useContext(PlaylistTracksContext);

  const handleSave = name => {
    const uris = playlistTracks.map(track => track.URI);
    console.log(uris);
    console.log(name);
    Spotify.savePlaylist(uris, name);
    dispatchPlaylistTracks({
      type: "RESET_LIST"
    });
  };

  return (
    <div className={PlaylistStyles.container}>
      <div className={PlaylistStyles.utilities}>
        <h1></h1>
        <input
          placeholder="Your Playlist Name Here"
          type="text"
          value={name.playlistName}
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
        {" "}
        <TrackList isRemove={isRemove} tracks={playlistTracks} />
      </div>
    </div>
  );
}

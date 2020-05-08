import React, { useState, useContext } from "react";
import TrackList from "./TrackList";
import PlaylistTracksContext from "../context/playlistTracks-context";
import Spotify from "../api/spotifyFetch";

export default function Playlist({ isRemove }) {
  const [name, setName] = useState({ playlistName: "New PlayList" });
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
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "yellow 2px solid"
      }}
    >
      <TrackList isRemove={isRemove} tracks={playlistTracks} />

      <input
        type="text"
        value={name.playlistName}
        onChange={e => handleChange(e)}
      />

      <a
        style={{
          border: "white 2px solid"
        }}
        onClick={() => handleSave(name)}
      >
        SAVE TO SPOTIFY
      </a>
    </div>
  );
}

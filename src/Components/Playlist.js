import React, { useState } from "react";
import TrackList from './TrackList';

export default function Playlist({ updatePlaylistName, playlistName,playlistTracks, removeTrack, isRemove }) {
  const [name, setName] = useState({ playListName: "New PlayList" });
  const handleChange = e => setName(e.target.value);
  const handleClick = () => {};

  return (
    <div>
      <input
        value={name.playListName}
        type="text"
        onChange={e => handleChange(e)}
          />
          <TrackList isRemove={isRemove} removeTrack={removeTrack}  tracks={playlistTracks} updatePlaylistName={updatePlaylistName}/>
      <button onClick={() => handleClick()}>savePlaylist</button>
    </div>
  );
}

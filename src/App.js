import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import Spotify from "./api/spotifyFetch";
import TrackList from "./Components/TrackList";
import Playlist from "./Components/Playlist";
import SearchResults from "./Components/SearchResults";

import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlayListTracks] = useState([]);

  Spotify.getAccessToken();

  //create
  const addTrack = track =>
    playlistTracks.find(savedTrack => savedTrack.ID === track.ID)
      ? console.log("cant add twice")
      : setPlayListTracks([...playlistTracks, track]);
  //delete

  const removeTrack = track => {
    const remove = playlistTracks.filter(
      existTrack => existTrack.ID !== track.ID
    );
    setPlayListTracks(remove);
  };

  const updatePlaylistName = name => setPlaylistName({ playlistName: name });

  const searchSpotify = term => {
    if (Spotify.search(term)) {
      Spotify.search(term).then(results => setSearchResults(results));
    }
  };

  return (
    <div className="App">
      <SearchBar spotifySearch={searchSpotify} />

      <SearchResults
        isRemove={false}
        addTrack={addTrack}
        tracks={searchResults}
      />
      <Playlist
        isRemove={true}
        removeTrack={removeTrack}
        removeTrack={removeTrack}
        playlistTracks={playlistTracks}
        playlistName={playlistName}
        updatePlaylistName={updatePlaylistName}
      />
    </div>
  );
}

export default App;

import React, { useState, useReducer } from "react";
import SearchBar from "./Components/SearchBar";
import Spotify from "./api/spotifyFetch";
import Playlist from "./Components/Playlist";
import SearchResults from "./Components/SearchResults";
import trackReducer from "./reducers/playlistTracks";
import searchResultsReducer from "./reducers/searchResults";
import PlaylistTracksContext from "./context/playlistTracks-context";
import playlistNameReducer from './reducers/playlistname';

import "./App.css";



function App() {
  const [playlistName, dispatchPlaylistName] = useReducer(
    playlistNameReducer,
    ""
  );

  const [searchResults, dispatchSearchResults] = useReducer(
    searchResultsReducer,
    []
  );
  const [playlistTracks, dispatchPlaylistTracks] = useReducer(trackReducer, []);

  Spotify.getAccessToken();

  

  const searchSpotify = term => {
    if (Spotify.search(term)) {
      Spotify.search(term).then(results =>
        dispatchSearchResults({
          type: "GET_RESULTS",
          results
        })
      );
    }
  };

  return (
    <PlaylistTracksContext.Provider
      value={{ searchResults, dispatchPlaylistTracks, playlistTracks,playlistName,dispatchPlaylistName }}
    >
      <div className="App">
        <SearchBar spotifySearch={searchSpotify} />

        <SearchResults isRemove={false} />
        <Playlist
          isRemove={true}
          
         
        />
      </div>
    </PlaylistTracksContext.Provider>
  );
}

export default App;

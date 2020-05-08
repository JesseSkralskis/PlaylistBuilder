import React, { useState, useReducer } from "react";
import SearchBar from "./Components/SearchBar";
import Spotify from "./api/spotifyFetch";
import Playlist from "./Components/Playlist";
import SearchResults from "./Components/SearchResults";
import trackReducer from "./reducers/playlistTracks";
import searchResultsReducer from "./reducers/searchResults";
import PlaylistTracksContext from "./context/playlistTracks-context";
import playlistNameReducer from "./reducers/playlistname";
import AppStyle from "./styles/components/app.module.scss";
import Header from "./Components/Header";

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
      value={{
        searchResults,
        dispatchPlaylistTracks,
        playlistTracks,
        playlistName,
        dispatchPlaylistName
      }}
    >
      <div className={AppStyle.container}>
        <div className={AppStyle.headerContainer}>
          <Header />
        </div>
        <div className={AppStyle.overLay}></div>
        <div className={AppStyle.backGround}></div>
        <div className={AppStyle.searchBarContainer}>
          {" "}
          <SearchBar spotifySearch={searchSpotify} />
        </div>
        <div className={AppStyle.resultsContainer}>
          <SearchResults isRemove={false} />
        </div>
        <div className={AppStyle.playlistContainer}>
          <Playlist isRemove={true} />
        </div>
      </div>
    </PlaylistTracksContext.Provider>
  );
}

export default App;

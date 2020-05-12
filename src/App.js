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
    null
  );
  const [playlistTracks, dispatchPlaylistTracks] = useReducer(trackReducer, []);

  Spotify.getAccessToken();

  return (
    <PlaylistTracksContext.Provider
      value={{
        dispatchSearchResults,
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
          <SearchBar />
        </div>
        <div className={AppStyle.srPLContainer}>
          <div className={AppStyle.resultsContainer}>
            <SearchResults isRemove={false} />
          </div>
          <div className={AppStyle.playlistContainer}>
            <Playlist isRemove={true} />
          </div>{" "}
        </div>
      </div>
    </PlaylistTracksContext.Provider>
  );
}

export default App;

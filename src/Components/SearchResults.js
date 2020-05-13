import React, { useContext, useEffect, useState } from "react";
import TrackList from "./TrackList";
import PlaylistTracksContext from "../context/playlistTracks-context";
import SearchResultsStyle from "../styles/components/searchResults.module.scss";

export default function SearchResults({ isRemove }) {
  const { searchResults } = useContext(PlaylistTracksContext);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchResults !== null) {
      if (searchResults.length === 0) {
        setError("Sorry No Results");
        setTimeout(() => setError(""), 3000);
      }
    }
  }, [searchResults]);

  return (
    <div className={SearchResultsStyle.container}>
      {error !== "" && (
        <div className={SearchResultsStyle.error}>
          <h1>{error}</h1>
        </div>
      )}{" "}
      <TrackList isRemove={isRemove} tracks={searchResults} />
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import TrackList from "./TrackList";
import PlaylistTracksContext from "../context/playlistTracks-context";

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
    <div>
      {error !== "" && (
        <div
          style={{
            zIndex: "2",
            color: "red",
            marginLeft: "10rem"
          }}
        >
          <h1>{error}</h1>
        </div>
      )}{" "}
      <TrackList isRemove={isRemove} tracks={searchResults} />
    </div>
  );
}

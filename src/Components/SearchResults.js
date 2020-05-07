import React, { useContext } from "react";
import TrackList from "./TrackList";
import PlaylistTracksContext from "../context/playlistTracks-context";

export default function SearchResults({ isRemove }) {
  const { searchResults } = useContext(PlaylistTracksContext);
  return (
    <div>
      <TrackList isRemove={isRemove}  tracks={searchResults} />
    </div>
  );
}

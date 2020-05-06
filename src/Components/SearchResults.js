import React from "react";
import TrackList from "./TrackList";

export default function SearchResults({ addTrack, tracks, isRemove }) {
  return (
    <div>
      <TrackList isRemove={isRemove} addTrack={addTrack} tracks={tracks} />
    </div>
  );
}

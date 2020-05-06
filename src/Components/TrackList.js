import React from "react";
import Track from "./Track";

export default function TrackList({
    isRemove,
  tracks,
  addTrack,
  updatePlaylistName,
  removeTrack
}) {
  return (
    <div>
      {tracks.map(track => (
          <Track
              isRemove={isRemove}
          removeTrack={removeTrack}
          updatePlaylistName={updatePlaylistName}
          addTrack={addTrack}
          key={track.ID}
          {...track}
          track={track}
        />
      ))}
    </div>
  );
}

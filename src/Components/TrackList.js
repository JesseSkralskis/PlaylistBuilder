import React from "react";
import Track from "./Track";
import TracklistStyles from "../styles/components/tracklist.module.scss";

export default function TrackList({ isRemove, tracks }) {
  return (
    <div className={TracklistStyles.container}>
      {tracks.map(track => (
        <Track isRemove={isRemove} key={track.ID} {...track} track={track} />
      ))}
    </div>
  );
}

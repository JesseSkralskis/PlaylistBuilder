import React, { useState, useContext } from "react";
import Track from "./Track";
import TracklistStyles from "../styles/components/tracklist.module.scss";

export default function TrackList({ isRemove, tracks }) {
  const [error, setError] = useState("");

  return (
    <div className={TracklistStyles.container}>
      {tracks !== null &&
        tracks.map(track => (
          <Track isRemove={isRemove} key={track.ID} {...track} track={track} />
        ))}
    </div>
  );
}

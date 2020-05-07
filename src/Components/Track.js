import React, { useState, useContext } from "react";
import PlaylistTracksContext from "../context/playlistTracks-context";

export default function Track({
  Name,
  Artist,
  Album,
  track,

  isRemove
}) {
  const {
    dispatchPlaylistTracks,
    playlistTracks,
    dispatchPlaylistName
  } = useContext(PlaylistTracksContext);
  const handleAdd = track => {
    playlistTracks.find(ogtrack => ogtrack.ID === track.ID)
      ? console.log("already added")
      : dispatchPlaylistTracks({
          type: "ADD_TRACK",
          track
        });
  };

  const renderAction = () =>
    isRemove ? (
      <p
        onClick={() =>
          dispatchPlaylistTracks({
            type: "REMOVE_TRACK",
            track
          })
        }
      >
        -
      </p>
    ) : (
      <p onClick={() => handleAdd(track)}>+</p>
    );
  return (
    <div>
      <div>
        <h3>{Name}</h3>
        <h3>{Artist}</h3>
        <h3>{Album}</h3>
        <a>{renderAction()}</a>
      </div>
    </div>
  );
}

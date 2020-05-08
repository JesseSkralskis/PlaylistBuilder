import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PlaylistTracksContext from "../context/playlistTracks-context";
import Spotify from "../api/spotifyFetch";
import TrackStyles from "../styles/components/track.module.scss";

export default function Track({
  Name,
  Artist,
  Album,
  track,

  isRemove
}) {
  const [previewResults, setPreviewResults] = useState("");
  const { dispatchPlaylistTracks, playlistTracks } = useContext(
    PlaylistTracksContext
  );

  useEffect(() => {
    console.log("effect fired");
    Spotify.getPreviewUrl(track.ID).then(results => {
      setPreviewResults(results);
    });
  }, []);
  const handleAdd = track => {
    playlistTracks.find(ogtrack => ogtrack.ID === track.ID)
      ? console.log("already added")
      : dispatchPlaylistTracks({
          type: "ADD_TRACK",
          track
        });
  };

  // const handlePreview = id => {
  //   console.log("called");

  // };

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
    <div className={TrackStyles.container}>
      <div className={TrackStyles.content}>
        <div className={TrackStyles.artistSong}>
          <h3>
            {Artist} - {Name}
          </h3>
        </div>
        <div className={TrackStyles.album}>
          {" "}
          <h3>{Album}</h3>
        </div>
        <div className={TrackStyles.buttons}>
          <div className={TrackStyles.plus}>
            {" "}
            <a>{renderAction()}</a>
          </div>
          <div className={TrackStyles.preview}>
            {" "}
            <a target="_blank" href={previewResults.URL}>
              Preview Track
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

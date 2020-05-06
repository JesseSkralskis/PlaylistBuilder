import React, { useState } from "react";

export default function Track({
  Name,
  Artist,
  Album,
  id,
  addTrack,
  track,
  removeTrack,
  isRemove
}) {
  const [addedTracks, setAddedTracks] = useState([]);

  const handleAdd = track => addTrack(track);
  const handleRemove = track => removeTrack(track);
  const renderAction = () =>
    isRemove ? (
      <p onClick={() => handleRemove(track)}>-</p>
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

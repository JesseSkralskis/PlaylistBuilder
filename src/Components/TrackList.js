import React from "react";
import Track from "./Track";

export default function TrackList({
    isRemove,
  tracks,
  
  
 
}) {
  return (
    <div>
      {tracks.map(track => (
          <Track
              isRemove={isRemove}
        
         
         
          key={track.ID}
          {...track}
          track={track}
        />
      ))}
    </div>
  );
}

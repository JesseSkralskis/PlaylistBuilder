import React, { useState, useContext } from "react";
import PlaylistTracksContext from "../context/playlistTracks-context";
import Spotify from "../api/spotifyFetch";

export default function SearchBar() {
  const { dispatchSearchResults } = useContext(PlaylistTracksContext);

  const searchSpotify = term => {
    if (Spotify.search(term)) {
      console.log("search called");
      Spotify.search(term).then(results =>
        dispatchSearchResults({
          type: "GET_RESULTS",
          results
        })
      );
    }
  };

  const [term, setTerm] = useState(null);

  const handleChange = e => {
    setTerm(e.target.value);
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      searchSpotify(term);
    }
  };

  return (
    <div style={{}}>
      <input
        placeholder={"Enter A Song, Album, or Artist"}
        type="text"
        onKeyPress={e => handleEnter(e)}
        onChange={e => handleChange(e)}
      />
    </div>
  );
}

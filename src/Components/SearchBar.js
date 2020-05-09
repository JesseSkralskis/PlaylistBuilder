import React, { useState } from "react";

export default function SearchBar({ spotifySearch }) {
  const [term, setTerm] = useState(null);
  const [error, setError] = useState(false);
  const handleChange = e => {
    setTerm(e.target.value);
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      spotifySearch(term);
    }
  };

  return (
    <div
      style={{
        marginTop: "1rem"
      }}
    >
      <input
        placeholder={"Enter A Song, Album, or Artist"}
        type="text"
        onKeyPress={e => handleEnter(e)}
        onChange={e => handleChange(e)}
      />
    </div>
  );
}

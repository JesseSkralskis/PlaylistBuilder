import React from "react";

export default function Header() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          lineHeight: 0.9
        }}
      >
        Vibes <br />{" "}
        <span
          style={{
            fontSize: "16px",
            fontWeight: "220"
          }}
        >
          a spotify playlist builder
        </span>
      </h1>
    </div>
  );
}

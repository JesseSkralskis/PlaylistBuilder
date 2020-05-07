const playlistNameReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYLIST_NAME":
      return action.name;

    default:
      return state;
  }
};

export { playlistNameReducer as default };
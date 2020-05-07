const trackReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRACK":
      return [...state, action.track];

    case "REMOVE_TRACK":
      return state.filter(og => og.ID !== action.track.ID);

    case "RESET_LIST":
      return [];

    default:
      return state;
  }
};

export { trackReducer as default };

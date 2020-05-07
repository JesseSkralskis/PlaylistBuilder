const searchResultsReducer = (state, action) => {
  switch (action.type) {
    case "GET_RESULTS":
      return action.results;

    default:
      return state;
  }
};

export { searchResultsReducer as default };
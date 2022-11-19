const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_DATE":
      return {
        ...state,
        sortByDate: action.payload,
      };
    case "SORT_BY_PRIORITY":
      return {
        ...state,
        sortByPriority: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        sortByDate: "",
        sortByPriority: "",
        search: action.payload.search,
      };
    case "CLEAR_FILTER":
      return {
        sortByDate: "",
        sortByPriority: "",
        search: "",
      };
    default:
      return state;
  }
};

export { filterReducer };

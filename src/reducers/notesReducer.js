const notesReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: action.payload,
      };
    case "REMOVE_NOTE":
      return { ...state, notes: action.payload };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: action.payload,
      };
    case "CLEAR_NOTES":
      return {
        ...state,
        notes: [],
      };
    default:
      return state;
  }
};

export { notesReducer };

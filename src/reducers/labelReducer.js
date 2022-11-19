const labelReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LABEL":
      return { ...state, labels: [...state.labels, action.payload] };
    default:
      return state;
  }
};

export { labelReducer };

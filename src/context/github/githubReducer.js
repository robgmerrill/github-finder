const githubReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;

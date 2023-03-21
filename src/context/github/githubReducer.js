const githubReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
        return {
            ...state,
            isLoading: false,
            user: action.payload
        }
    case "ADD_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "GET_REPOS":
      return {
        ...state,
        repos: action.payload,
        isLoading: false,
      }
    case "CLEAR_USERS":
    return {
        ...state,
        users: action.payload,
        isLoading: false,
    };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;

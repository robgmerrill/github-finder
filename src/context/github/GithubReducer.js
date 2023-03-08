// define function as you normally would. It will take two arguments. state and action
// state comes from the initial state you pass into the useReducer hook
// action in an object which will have a type property to shape the logic in the funtion. It can also accept a payload property for data we want to pass to the function
const githubReducer = (state, action) => {
  //switch statements are typically used.
  // will probably always use the syntax switch(action.type)
  switch (action.type) {
    // if our type property is "GET_USERS"
    case "GET_USERS":
      // this will return the new state
      return {
        // first we spread out the state...I think that might be to avoid mutation
        ...state,
        // our initial state had an array of []. It is replaced with payload which was the data from the github query. this is like setUsers(data)
        users: action.payload,
        // we want loading to be set to false. This was like doing setLoading(false)
        loading: false,
      };
    // this would be a fallback if there were no matches for type
    default:
      return state;
  }
};

export default githubReducer;

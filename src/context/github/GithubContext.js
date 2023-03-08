import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // These are commented out becuase I am using reducer instead of useState
  //   const [users, setUsers] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  //   I create an object with the initial state. I need state for users to be an empty array and loading to be set to true. Similar to initial state set using useState
  const initialState = {
    users: [],
    loading: true,
  };

  // I will destructure state and dispatch from the useReducer hook. The hook takes our reducer function and our initialState object we created. The dispatch hook is what allows us to use to interact with our state in the reducer we create.
  const [state, dispatch] = useReducer(githubReducer, initialState);
  console.log("state", state);
  console.log("dispatch", dispatch);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    // setUsers(data);
    // setIsLoading(false);

    // previously, in this section we updated the state in useState with a setState method. Now, we use the dispatch function returned from useReducer.
    // it will take an object with a type and a payload.
    // type will be a string in uppercase that affects the logic we run
    // payload: this is where we can add the data that we got from the query.
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

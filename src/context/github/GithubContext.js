import { createContext, useState, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //   Get search results
  const searchUsers = async (searchTerm) => {
    setLoading();

    console.log(`${GITHUB_URL}/users?q=${searchTerm}`)

    const response = await fetch(`${GITHUB_URL}/search/users?q=${searchTerm}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    const actions = {
      type: "ADD_USERS",
      payload: data.items,
    };
    dispatch(actions);
  };

  function clearUsers() {
    setLoading();
    const actions = {
        type: "CLEAR_USERS",
        payload: []
    }
    dispatch(actions);
  }


  //   set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

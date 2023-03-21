import { createContext, useState, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //   Get search results
  const searchUsers = async (searchTerm) => {
    setLoading();

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

  // get a single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      const actions = {
        type: "ADD_USER",
        payload: data,
      };
      dispatch(actions);
    }
  };

   //   Get user repos
   const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    const actions = {
      type: "GET_REPOS",
      payload: data,
    };
    dispatch(actions);
  };

  function clearUsers() {
    setLoading();
    const actions = {
      type: "CLEAR_USERS",
      payload: [],
    };
    dispatch(actions);
  }

  //   set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isLoading: state.isLoading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

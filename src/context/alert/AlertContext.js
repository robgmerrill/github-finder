import { createContext, useReducer } from "react";
import alertReducer from "./alertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

    // creat a funciton to set an alert
    const setAlert =  (msg, type) => {
        const actions = {
            type: 'SET_ALERT',
            payload: {
                msg, 
                type
            }
        }
        dispatch(actions)

        setTimeout(() => dispatch({type: 'REMOVE_ALERT'}), 3000)
    }

  return <AlertContext.Provider value={{alert: state, setAlert}}>{children}</AlertContext.Provider>;
};

export default AlertContext;

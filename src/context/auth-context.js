import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/";

const AuthContext = createContext({
  authState: {},
  authDispatch: () => {},
});

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  if (!authState.token) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    token && user
      ? authDispatch({ type: "INITIAL_CHECK", payload: { user, token } })
      : null;
  }

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

import React, { createContext, useContext, useReducer } from "react";
import { labelReducer } from "../reducers/";

const LabelContext = createContext(null);

const LabelProvider = ({ children }) => {
  const [labelState, labelDispatch] = useReducer(labelReducer, {
    labels: [],
  });
  return (
    <LabelContext.Provider value={{ labelState, labelDispatch }}>
      {children}
    </LabelContext.Provider>
  );
};

const useLabel = () => useContext(LabelContext);

export { useLabel, LabelProvider };

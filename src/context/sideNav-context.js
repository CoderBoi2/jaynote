import React, { useState, createContext, useContext } from "react";

const SideNavContext = createContext(null);

const SideNavProvider = ({ children }) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    <SideNavContext.Provider value={{ sideNavOpen, setSideNavOpen }}>
      {children}
    </SideNavContext.Provider>
  );
};

const useSideNav = () => useContext(SideNavContext);

export { useSideNav, SideNavProvider };

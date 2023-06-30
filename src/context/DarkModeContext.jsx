import React, { createContext, useContext } from "react";

const DarkModeContext = createContext(true);

export default function DarkModeProvider({ value, children }) {
  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}

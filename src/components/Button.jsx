import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const ButtonStyle = (darkMode) => ({
  background: darkMode ? "#4b5563" : "white",
  color: darkMode ? "white" : "black",
  boxShadow: darkMode ? "" : "-5px 5px 0px -1px rgba(0,0,0,0.75)",
  borderRadius: darkMode ? "0.25rem" : "",
  outline: darkMode ? "1px solid #9ca3af" : "",
});

export default function Button({ children, onClick = () => {}, className, style }) {
  const darkMode = useDarkMode();
  return (
    <button onClick={onClick} className={"bg-blue-100 text-black p-1 active:translate-y-px text-sm md:text-base " + className} style={ButtonStyle(darkMode)}>
      {children}
    </button>
  );
}

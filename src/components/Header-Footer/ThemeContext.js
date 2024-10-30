import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    backgroundColor: "#ffffff",
    color: "#000000",
  };

  const darkTheme = {
    backgroundColor: "#000000",
    color: "#ffffff",
  };

  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });
  
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
  }, [dark]);
  const theme = dark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setDark(!dark);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, dark }}>
      {children}
    </ThemeContext.Provider>
  );
};

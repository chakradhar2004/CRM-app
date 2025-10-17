import React, { createContext, useContext, useState } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

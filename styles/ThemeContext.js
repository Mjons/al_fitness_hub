import { createContext, useContext } from 'react';
import { darkColors } from './theme';

const ThemeContext = createContext({
  colors: darkColors,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export function useTheme() {
  return useContext(ThemeContext);
}

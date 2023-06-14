import { createContext, useEffect, useState } from 'react';

const initialState = {
   theme: 'lightMode',
   toggleTheme: () => {},
};

export const ThemeContext = createContext({} as typeof initialState);

interface ThemeProviderProps {
   children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
   const [theme, setTheme] = useState<string>('lightMode');

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const localTheme = window.localStorage.getItem('theme');
         if (localTheme) {
            setTheme(localTheme);
         }
      }
   }, []);

   const toggleTheme = () => {
      const newTheme = theme === 'lightMode' ? 'darkMode' : 'lightMode';
      window.localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
   };

   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

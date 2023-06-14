import { ThemeContext } from '../../context/theme/ThemeContext';
import { useContext } from 'react';

export const useThemeContext = () => {
   const context = useContext(ThemeContext);
   if (context === undefined) {
      throw new Error('useThemeContext must be used within a ThemeProvider');
   }
   return context;
};

import { useState, useEffect } from 'react';

export const useWidth = () => {
   const [width, setWidth] = useState<number>(0); // Initialize width with a default value

   useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      setWidth(window.innerWidth); // Update width with initial window.innerWidth value
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return width;
};

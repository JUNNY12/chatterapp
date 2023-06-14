import { useContext } from 'react';
import { ArticleContextProps } from '../../context/article/ArticleContext';
import { ArticleContext } from '../../context/article/ArticleContext';

export const useArticleContext = (): ArticleContextProps => {
   const context = useContext(ArticleContext);
   if (context === undefined) {
      throw new Error('useArticleContext must be used within a ArticleContextProvider');
   }
   return context;
};

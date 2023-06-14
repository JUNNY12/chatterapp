import { useContext } from 'react';
import { ArticleInteractionContext } from '../../context/article/ArticleInteractionContext';

export const useArticleInteractionContext = () => {
   const context = useContext(ArticleInteractionContext);

   if (context === undefined) {
      throw new Error(
         'useArticleInteractionProvider must be used within a ArticleInteractionProvider'
      );
   }

   return context;
};

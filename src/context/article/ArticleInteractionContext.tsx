import { createContext, useEffect, useState } from 'react';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { SinglePostInterface } from './FetchAllPostContext';

interface initialStateInterface {
    articles: SinglePostInterface[];
}

interface articleContextInterface {
    articles: SinglePostInterface[];
}

// Create the context
export const ArticleInteractionContext = createContext<articleContextInterface>(
    {
        articles: [],
    }
);

interface childrenProps {
    children: React.ReactNode;
}

// Create the provider component
export const ArticleInteractionProvider = ({ children }: childrenProps) => {
    const [comment, setComment] = useState('');
    const { posts } = useFetchPost();
    const [allArticles, seAllArticles] = useState(posts);

    useEffect(() => {
        seAllArticles(posts);
    }, [posts]);

    console.log('allArticles', allArticles);




    return (
        <ArticleInteractionContext.Provider
            value={{
                articles: allArticles}}
        >
            {children}
        </ArticleInteractionContext.Provider>
    );
};

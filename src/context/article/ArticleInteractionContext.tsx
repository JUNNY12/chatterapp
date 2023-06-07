import { createContext, useEffect, useReducer, useState } from 'react';
import { articleReducer } from '../../reducers';
import { Article_Action_Types } from '../../reducers';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { SinglePostInterface } from './FetchAllPostContext';

interface initialStateInterface {
    articles: SinglePostInterface[];
}

const initialState: initialStateInterface = {
    articles: [],
};

interface articleContextInterface {
    articles: SinglePostInterface[];
    likeArticle: (articleId: any, userId: any) => void;
    commentOnArticle: (articleId: any, comment: any, userId: any) => void;
    handleInput: (e: any) => void;
    comment: string;
    setArticles: (posts: SinglePostInterface[]) => void;
}

// Create the context
export const ArticleInteractionContext = createContext<articleContextInterface>(
    {
        articles: [],
        likeArticle: () => {},
        handleInput: () => {},
        setArticles: () => {},
        commentOnArticle: () => {},
        comment: '',
    }
);

interface childrenProps {
    children: React.ReactNode;
}

// Create the provider component
export const ArticleInteractionProvider = ({ children }: childrenProps) => {
    const [state, dispatch] = useReducer(articleReducer, initialState);
    const [comment, setComment] = useState('');
    const { posts } = useFetchPost();

    const { articles } = state;

    const { LIKE_ARTICLE, COMMENT_ON_ARTICLE, SET_ARTICLES } =
        Article_Action_Types;

    console.log('posts', posts);
    console.log('state', state);

    // Set the articles
    const setArticles = (posts: SinglePostInterface[]) => {
        dispatch({
            type: SET_ARTICLES,
            payload: posts,
        });
    };

    useEffect(() => {
        if (posts.length > 0) {
            setArticles(posts);
        }
    }, [posts]);

    // Define the action functions
    const likeArticle = (articleId: any, userId: any) => {
        dispatch({
            type: LIKE_ARTICLE,
            payload: { articleId, userId },
        });
    };

    const commentOnArticle = (articleId: any, comment: any, userId: any) => {
        dispatch({
            type: COMMENT_ON_ARTICLE,
            payload: { articleId, comment, userId },
        });
    };

    const handleInput = (e: any) => {
        setComment(e.target.value);
    };

    return (
        <ArticleInteractionContext.Provider
            value={{
                articles,
                likeArticle,
                commentOnArticle,
                comment,
                handleInput,
                setArticles,
            }}
        >
            {children}
        </ArticleInteractionContext.Provider>
    );
};

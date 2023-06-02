import { createContext, useState, ChangeEvent } from 'react';

//interface for comment
interface Comment {
    id?: string;
    text?: string;
    author?: {
        authorId?: string;
        fullName?: string;
        photoUrl?: string;
    };
    createdAt?: string;
    replies?: Comment[];
}

//interface for article
export interface ArticleContextProps {
    article: {
        title?: string;
        subtitle?: string;
        body?: string;
        coverImage?: string;
        tagList: string[];
        author?: {
            authorId?: string;
            displayName?: string;
            fullName?: string;
            bio?: string;
            image?: string;
        };
        createdAt?: string;
        updatedAt?: string;
        slug?: string;
        likeCount?: number;
        commentCount?: number;
        views?: number;
        comments: Comment[];
    };
    addTag: (tag: string) => void;
    addComment: (comment: Comment) => void;
    deleteComment: (commentId: string) => void;
    clearArticle: () => void;
    setArticle: React.Dispatch<
        React.SetStateAction<{
            title?: string;
            subtitle?: string;
            body?: string;
            coverImage?: string;
            tagList: string[];
            author?: {
                authorId?: string;
                displayName?: string;
                fullName?: string;
                bio?: string;
                image?: string;
            };
            createdAt?: string;
            updatedAt?: string;
            slug?: string;
            likeCount?: number;
            commentCount?: number;
            views?: number;
            comments: Comment[];
        }>
    >;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleCommentInput: (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
    commentInput?: string;
    tagQuery: string;
    handleTagQuery: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ArticleContext = createContext<ArticleContextProps>({
    article: {
        title: '',
        subtitle: '',
        body: '',
        coverImage: '',
        tagList: [],
        author: {
            authorId: '',
            displayName: '',
            fullName: '',
            bio: '',
            image: '',
        },
        createdAt: '',
        updatedAt: '',
        slug: '',
        likeCount: 0,
        commentCount: 0,
        views: 0,
        comments: [],
    },
    //function to add comment
    addComment: () => {},
    //function to delete comment
    deleteComment: () => {},

    addTag: () => {},

    //function to set article
    setArticle: () => {},
    //function to handle onChange event for article
    handleOnChange: () => {},

    clearArticle: () => {},
    //function to handle onChange event for comment
    handleCommentInput: () => {},
    commentInput: '',

    tagQuery: '',
    handleTagQuery: () => {},
});

//interface for article provider
type ArticleProviderProps = {
    children: React.ReactNode;
};

export const ArticleProvider = ({ children }: ArticleProviderProps) => {
    const [commentInput, setCommentInput] = useState('');
    const [tagQuery, setTagQuery] = useState('');
    const [article, setArticle] = useState<ArticleContextProps['article']>({
        title: '',
        subtitle: '',
        body: '',
        coverImage: '',
        tagList: [],
        author: {
            authorId: '',
            displayName: '',
            fullName: '',
            bio: '',
            image: '',
        },
        createdAt: '',
        updatedAt: '',
        slug: '',
        likeCount: 0,
        commentCount: 0,
        views: 0,
        comments: [],
    });

    // Handle onChange event of input elements
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    const handleTagQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setTagQuery(event.target.value);
        console.log(tagQuery);
    };

    const addTag = (tag: string) => {
        const { tagList } = article;
        const isSelected = tagList?.includes(tag);

        if (isSelected) {
            setArticle((prevState) => ({
                ...prevState,
                tagList: prevState.tagList?.filter((item) => item !== tag),
            }));
        } else {
            setArticle((prevState) => ({
                ...prevState,
                tagList: [...prevState.tagList, tag],
            }));
        }
    };

    //function to handle onChange event for comment
    const handleCommentInput = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCommentInput(event.target.value);
    };

    //function to add comment
    const addComment = (comment: Comment) => {
        setArticle((prevArticle) => ({
            ...prevArticle,
            comments: [...prevArticle.comments, comment],
        }));
    };

    //function to delete comment
    const deleteComment = (commentId: string) => {
        setArticle((prevArticle) => ({
            ...prevArticle,
            comments: prevArticle.comments.filter(
                (comment) => comment.id !== commentId
            ),
        }));
    };

    const clearArticle = () => {
        setArticle({
            title: '',
            subtitle: '',
            body: '',
            coverImage: '',
            tagList: [],
            author: {
                authorId: '',
                displayName: '',
                fullName: '',
                bio: '',
                image: '',
            },
            createdAt: '',
            updatedAt: '',
            slug: '',
            likeCount: 0,
            commentCount: 0,
            views: 0,
            comments: [],
        });
        setCommentInput('');
        setTagQuery('');
    };

    //return the provider
    return (
        <ArticleContext.Provider
            value={{
                article,
                setArticle,
                handleOnChange,
                handleCommentInput,
                addComment,
                deleteComment,
                commentInput,
                tagQuery,
                handleTagQuery,
                addTag,
                clearArticle,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
};

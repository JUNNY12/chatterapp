export const Article_Action_Types = {
    LIKE_ARTICLE: 'LIKE_ARTICLE',
    COMMENT_ON_ARTICLE: 'COMMENT_ON_ARTICLE',
    SET_ARTICLES: 'SET_ARTICLES',
};
import { updateArticle } from "../firebase/article";

const { LIKE_ARTICLE, COMMENT_ON_ARTICLE, SET_ARTICLES } = Article_Action_Types;

export const articleReducer = (state: any, action: any) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            };

        case LIKE_ARTICLE:
            const updatedArticles = state.articles.map((article: any) => {
                if (article.id === action.payload.articleId) {
                    // Toggle the like status for the article
                    const isLiked = article.likes.includes(
                        action.payload.userId
                    );
                    const updatedLikes = isLiked
                        ? article.likes.filter(
                              (userId: any) => userId !== action.payload.userId
                          )
                        : [...article.likes, action.payload.userId];

                    return {
                        ...article,
                        likes: updatedLikes,
                    };
                }
                return article;
            });

            return {
                ...state,
                articles: updatedArticles,
            };

        case COMMENT_ON_ARTICLE:
            const { articleId, comment, userId, authorId } = action.payload;
            const updatedArticlesWithComment = state.articles.map(
                (article: any) => {
                    if (article.id === articleId) {
                        const updatedComments = [
                            ...article.comments,
                            { userId, comment },
                        ];
                        
                        return {
                            ...article,
                            comments: updatedComments,
                        };

                    }
                    return article;
                }
            );

            return {
                ...state,
                articles: updatedArticlesWithComment,
            };

        default:
            return state;
    }
};

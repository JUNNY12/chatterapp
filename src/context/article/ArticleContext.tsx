import { createContext, useState, ChangeEvent, useEffect } from 'react';

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
      author?: { authorId?: string };
      createdAt?: string;
      updatedAt?: string;
      slug?: string;
      likeCount?: number;
      likeCounts: string[];
      commentCount?: number;
      views?: number;
      comments: Comment[];
      bookmarks?: string[];
   };
   addTag: (tag: string) => void;
   clearArticle: () => void;
   setArticle: React.Dispatch<
      React.SetStateAction<{
         title?: string;
         subtitle?: string;
         body?: string;
         coverImage?: string;
         tagList: string[];
         author?: { authorId?: string };
         createdAt?: string;
         updatedAt?: string;
         slug?: string;
         likeCount?: number;
         likeCounts: string[];
         commentCount?: number;
         views?: number;
         comments: Comment[];
         bookmarks?: string[];
      }>
   >;
   handleOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;

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
      author: { authorId: '' },
      createdAt: '',
      updatedAt: '',
      slug: '',
      likeCount: 0,
      commentCount: 0,
      likeCounts: [],
      views: 0,
      comments: [],
      bookmarks: [],
   },

   addTag: () => {},

   //function to set article
   setArticle: () => {},
   //function to handle onChange event for article
   handleOnChange: () => {},

   clearArticle: () => {},

   tagQuery: '',
   handleTagQuery: () => {},
});

//interface for article provider
type ArticleProviderProps = {
   children: React.ReactNode;
};

export const ArticleProvider = ({ children }: ArticleProviderProps) => {
   const [tagQuery, setTagQuery] = useState('');
   const [article, setArticle] = useState<ArticleContextProps['article']>({
      title: '',
      subtitle: '',
      body: '',
      coverImage: '',
      tagList: [],
      author: { authorId: '' },
      createdAt: '',
      updatedAt: '',
      slug: '',
      likeCounts: [],
      likeCount: 0,
      commentCount: 0,
      views: 0,
      comments: [],
      bookmarks: [],
   });

   //set the slug of the article to the title
   useEffect(() => {
      const { title } = article;
      setArticle((prev) => ({
         ...prev,
         slug: title,
         createdAt: new Date().toISOString(),
      }));
   }, [article.title]);

   // Handle onChange event of input elements
   const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setArticle((prevArticle) => ({
         ...prevArticle,
         [name]: value,
      }));
   };

   const handleTagQuery = (event: ChangeEvent<HTMLInputElement>) => {
      setTagQuery(event.target.value);
      // console.log(tagQuery);
   };

   const addTag = (tag: string) => {
      const { tagList } = article;
      const isSelected = tagList?.includes(tag);

      if (isSelected) {
         setArticle((prevState) => ({
            ...prevState,
            tagList: prevState.tagList?.filter((item) => item !== tag),
         }));
         setTagQuery('');
      } else {
         setArticle((prevState) => ({
            ...prevState,
            tagList: [...prevState.tagList, tag],
         }));
         setTagQuery('');
      }
   };

   const clearArticle = () => {
      setArticle({
         title: '',
         subtitle: '',
         body: '',
         coverImage: '',
         tagList: [],
         author: { authorId: '' },
         createdAt: '',
         updatedAt: '',
         slug: '',
         likeCount: 0,
         likeCounts: [],
         commentCount: 0,
         views: 0,
         comments: [],
      });
      setTagQuery('');
   };

   //return the provider
   return (
      <ArticleContext.Provider
         value={{
            article,
            setArticle,
            handleOnChange,
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

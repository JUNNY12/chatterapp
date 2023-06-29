import React, { createContext, useReducer, Dispatch, useMemo, useState, useEffect } from 'react';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { getAllUsers } from '../../firebase/user';
import { UserInterface } from '../users/FetchAllUserContext';

interface SearchState {
   searchTerm: string;
   searchResults: { posts: any; users: any };
}

interface SetSearchTermAction {
   type: 'SET_SEARCH_TERM';
   payload: string;
}

interface SetSearchResultsAction {
   type: 'SET_SEARCH_RESULTS';
   payload: {
      posts: any;
      users: any;
   };
}

type SearchAction = SetSearchTermAction | SetSearchResultsAction;

const initialState: SearchState = {
   searchTerm: '',
   searchResults: {
      posts: [] as any,
      users: [] as any,
   },
};

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
   switch (action.type) {
      case 'SET_SEARCH_TERM':
         return { ...state, searchTerm: action.payload };
      case 'SET_SEARCH_RESULTS':
         return { ...state, searchResults: action.payload };
      default:
         return state;
   }
};

interface SearchContextProps {
   state: SearchState;
   dispatch: Dispatch<SearchAction>;
   setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
   state: initialState,
   dispatch: () => {},
   setSearchTerm: () => {},
});

interface SearchContextProviderProps {
   children: React.ReactNode;
}

export const SearchContextProvider: React.FC<SearchContextProviderProps> = ({ children }) => {
   const [state, dispatch] = useReducer(searchReducer, initialState);
   const { posts } = useFetchPost();
   const [allUsers, setAllUsers] = useState<UserInterface[]>([]);

   const fetchUsers = async () => {
      try {
         const { users } = await getAllUsers();
         setAllUsers(users);
      } catch (error) {
         console.error('Error fetching users:', error);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   const setSearchTerm = (term: string) => {
      dispatch({ type: 'SET_SEARCH_TERM', payload: term });
   };

   const searchResults = useMemo(() => {
      if (state.searchTerm.trim() === '') {
         return [];
      }

      const searchTermLowercase = state?.searchTerm?.trim()?.toLowerCase();

      const filteredPosts = posts.filter((post) => {
         const titleLowercase = post?.title?.toLowerCase();
         const subtitleLowercase = post?.subtitle?.toLowerCase();
         const tagListLowercase = post?.tagList?.map((tag) => tag?.toLowerCase());
         return (
            titleLowercase?.indexOf(searchTermLowercase) !== -1 ||
            subtitleLowercase?.indexOf(searchTermLowercase) !== -1 ||
            tagListLowercase?.some((tag) => tag.indexOf(searchTermLowercase) !== -1)
         );
      });

      const onboardedUsers = allUsers?.filter((user) => user.status === 'onboarded');
      //   console.log('onboardedUsers', onboardedUsers)
      const filteredUsers = onboardedUsers?.filter((user) => {
         const displayNameLowercase = user?.displayName?.toLowerCase();
         const fullName = user?.fullName.toLowerCase();
         return (
            displayNameLowercase?.indexOf(searchTermLowercase) !== -1 ||
            fullName.indexOf(searchTermLowercase) !== -1
         );
      });

      return { posts: filteredPosts, users: filteredUsers };
   }, [state.searchTerm, posts, allUsers]);

   useMemo(() => {
      const { posts, users } = searchResults as any;
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: { posts, users } });
   }, [searchResults]);

   return (
      <SearchContext.Provider value={{ state, dispatch, setSearchTerm }}>
         {children}
      </SearchContext.Provider>
   );
};

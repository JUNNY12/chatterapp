import React, { createContext, useReducer, Dispatch, useMemo } from "react";
import { useFetchPost } from "../../hooks/article/useFetchPost";
import { SinglePostInterface } from "../article/FetchAllPostContext";

interface SearchState {
    searchTerm: string;
    searchResults: SinglePostInterface[];
}

interface SetSearchTermAction {
    type: "SET_SEARCH_TERM";
    payload: string;
}

interface SetSearchResultsAction {
    type: "SET_SEARCH_RESULTS";
    payload: SinglePostInterface[];
}

type SearchAction = SetSearchTermAction | SetSearchResultsAction;

const initialState: SearchState = {
    searchTerm: "",
    searchResults: [],
};

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            return { ...state, searchTerm: action.payload };
        case "SET_SEARCH_RESULTS":
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
    dispatch: () => { },
    setSearchTerm: () => { },
});

interface SearchContextProviderProps {
    children: React.ReactNode;
}

export const SearchContextProvider: React.FC<SearchContextProviderProps> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);
    const { posts } = useFetchPost();

    const setSearchTerm = (term: string) => {
        dispatch({ type: "SET_SEARCH_TERM", payload: term });
    };

    const searchPost = useMemo(() => {
        if (state.searchTerm.trim() === "") {
            return [];
        }

        const searchTermLowercase = state.searchTerm.trim().toLowerCase();
        return posts.filter((post) => {
            const titleLowercase = post.title.toLowerCase();
            const tagListLowercase = post.tagList.map((tag) => tag.toLowerCase());

            return (
                titleLowercase.indexOf(searchTermLowercase) !== -1 ||
                tagListLowercase.some((tag) => tag.indexOf(searchTermLowercase) !== -1)
            );
        });
    }, [state.searchTerm, posts]);


    useMemo(() => {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: searchPost });
    }, [searchPost]);

    return (
        <SearchContext.Provider value={{ state, dispatch, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

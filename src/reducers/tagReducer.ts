export interface TagState {
   tags: string[];
}

export function tagReducer(state: TagState, action: any) {
   switch (action.type) {
      case 'ADD_TAG':
         const { tag } = action.payload;
         const isSelected = state.tags.includes(tag);

         // If tag is already selected, remove it from the list
         if (isSelected) {
            return {
               ...state,
               tags: state.tags.filter((item) => item !== tag),
            };
            // If tag is not selected, add it to the list
         } else {
            return {
               ...state,
               tags: [...state.tags, tag],
            };
         }
      // reset tags
      case 'RESET_TAGS':
         return {
            ...state,
            tags: [],
         };

      default:
         return state;
   }
}

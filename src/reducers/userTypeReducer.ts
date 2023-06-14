export interface StateProps {
   isReader: boolean;
   isWriter: boolean;
}

export const userTypeReducer = (state: StateProps, action: any) => {
   switch (action.type) {
      case 'SELECT_READER':
         const updatedReaderState = {
            ...state,
            isReader: true,
            isWriter: false,
         };
         // console.log(updatedReaderState);
         return updatedReaderState;

      case 'SELECT_WRITER':
         const updatedWriterState = {
            ...state,
            isReader: false,
            isWriter: true,
         };
         // console.log(updatedWriterState);
         return updatedWriterState;

      default:
         return state;
   }
};

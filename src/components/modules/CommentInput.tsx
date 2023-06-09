import { Button } from '../element';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { BeatLoader } from 'react-spinners';

interface CommentProps {
   value: string | undefined;
   isLoading: boolean;
   onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CommentInput = ({
   value,
   onCommentChange,
   onCommentSubmit,
   isLoading,
}: CommentProps): React.JSX.Element => {
   const { userInfo } = useFetchUser();

   return (
      <div className=" flex mobileM:justify-center relative">
         <div className=" w-12 h-12 mb-6 me-2 rounded-full object-cover ">
            <img
               src={userInfo?.photoUrl}
               alt={userInfo?.displayName}
               className="rounded-full object-cover w-full h-full"
            />
         </div>
         <div>
            <form action="" onSubmit={onCommentSubmit} className="flex flex-col">
               <textarea
                  className="bg-gray-100 outline-none focus:border focus:border-pink-600 w-[350px]
                        mobileXL:w-[300px] mobileL:w-[250px] mobileM:w-full text-black-900
                        h-[60px] rounded-[8px] p-2"
                  value={value}
                  required
                  onChange={onCommentChange}
                  placeholder="Add a comment..."
               />

               {value && (
                  <Button className=" bg-pink-600 mt-4 w-[100px] text-white-50 p-2 rounded-[40px]">
                     {isLoading ? <BeatLoader color="#ffffff" size={8} /> : 'Post'}
                  </Button>
               )}
            </form>
         </div>
      </div>
   );
};

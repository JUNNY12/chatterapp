import { useEffect, useState } from 'react';
import { updateProfile } from '../../firebase/user';
import { useFetchUser } from './useFetchUser';

export const useFollow = () => {
   const [follow, setfollow] = useState('');
   const [followers, setfollowers] = useState<string[]>([]);
   const { userInfo } = useFetchUser();

   useEffect(() => {
      if (userInfo?.uid) {
         setfollowers(userInfo?.followers);
      }
   }, [userInfo, follow]);

   const userId = userInfo?.uid as string;
   // console.log(userInfo?.followers)
   // console.log(followers)

   const handleSetfollow = async (uid: string) => {
      setfollow(uid);

      if (uid) {
         try {
            if (followers === undefined) {
               const updatedFollowers = [uid];
               await updateProfile(userId, {
                  followers: updatedFollowers,
               });
               setfollowers(updatedFollowers);
            } else if (followers?.includes(uid)) {
               const updatedFollowers = followers.filter((id: any) => id !== uid);
               await updateProfile(userId, {
                  followers: updatedFollowers,
               });
               setfollowers(updatedFollowers);
            } else {
               const updatedFollowers = [...followers, uid];
               await updateProfile(userId, {
                  followers: updatedFollowers,
               });
               setfollowers(updatedFollowers);
            }
         } catch (e) {
            console.log(e);
         }
      }
   };
   console.log(follow);

   return { handleSetfollow, follow };
};

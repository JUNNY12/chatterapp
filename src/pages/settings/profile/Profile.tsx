import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { BasicInfo, SocialInfo } from '.';
import { Button } from '../../../components/element';
import { useFormData } from '../../../hooks/form/useFormData';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { updateProfile } from '../../../firebase/user';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import firebaseApp from '../../../firebase/config';
import { ref, getStorage } from 'firebase/storage';
import { handleCustomImageUpload } from '../../../firebase/upload/handleCustomImageUpload';
import { useFetchUser } from '../../../hooks/user/useFetchUser';
import { MetaTag } from '../../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../../config/constants/url';

export default function Profile(): React.JSX.Element {
   const { theme } = useThemeContext();
   const { user } = useAuthContext();
   const [loading, setLoading] = useState<boolean>(false);
   const imageRef = useRef<any>(null);
   const [image, setImage] = useState<any>(null);
   const { userInfo } = useFetchUser();

   const storage = getStorage(firebaseApp);

   // Upload image to firebase storage
   const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const imageFile = imageRef.current?.files?.[0];
      const storageRef = ref(storage, `${user?.uid}/profileImage/${imageFile?.name}`);

      try {
         const downloadURL = await handleCustomImageUpload(storageRef, imageFile);
         setImage(downloadURL);
         if (user) {
            updateProfile(user.uid, {
               photoUrl: downloadURL,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };
   const {
      values: {
         displayName,
         fullName,
         location,
         photoUrl,
         occupation,
         bio,
         availability,
         email,
         twitter,
         instagram,
         facebook,
         github,
         linkedIn,
         website,
         tags,
      },
      handleChange,
      setValues,
   } = useFormData({
      displayName: '',
      fullName: '',
      location: '',
      photoUrl: '',
      occupation: '',
      bio: '',
      availability: '',
      email: '',
      twitter: '',
      instagram: '',
      facebook: '',
      github: '',
      linkedIn: '',
      website: '',
      tags: [],
   });

   //update user info on mount
   useEffect(() => {
      if (userInfo) {
         setValues({
            displayName: userInfo?.displayName || '',
            fullName: userInfo?.fullName || '',
            email: userInfo?.email || '',
            photoUrl: userInfo?.photoUrl || '',
            occupation: userInfo?.occupation || '',
            bio: userInfo?.bio || '',
            location: userInfo?.location || '',
            availability: userInfo?.availability || '',
            twitter: userInfo?.socialInfo?.twitter || '',
            instagram: userInfo?.socialInfo?.instagram || '',
            facebook: userInfo?.socialInfo?.facebook || '',
            github: userInfo?.socialInfo?.github || '',
            linkedIn: userInfo?.socialInfo?.linkedIn || '',
            website: userInfo?.socialInfo?.website || '',
            tags: userInfo?.tags || [],
         });
      }
   }, [userInfo, setValues]);

   //handle user update
   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //if user is logged in
      if (user) {
         try {
            setLoading(true);
            //update user profile
            await updateProfile(user.uid, {
               displayName,
               fullName,
               occupation,
               bio,
               photoUrl,
               location,
               tags,
               availability,
               socialInfo: {
                  twitter,
                  instagram,
                  facebook,
                  github,
                  linkedIn,
                  website,
               },
            });

            //toast success if successful
            toast.success('Profile updated successfully', {
               position: 'top-center',
               autoClose: 1000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
            });

            setLoading(false);
         } catch (err) {
            console.log(err);
         }
      }

      console.log('update:');
   };

   return (
      <>
         <MetaTag
            title="Chatter "
            ogTitle="Manage your profile"
            description="Manage your profile on our inclusive platform. Post diverse content, connect with like-minded individuals"
            image={chatterImgUrl}
            url="/settings"
            twitterTitle="Manage your profile"
            twitterDescription="Manage your profile on our inclusive platform. Post diverse content, connect with like-minded individuals"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/settings"
         />
         <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
               theme === 'lightMode'
                  ? 'bg-white-50 text-black-950'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
         >
            <form onSubmit={handleUpdate}>
               <div className="my-3">
                  <label
                     title="change picture"
                     htmlFor="photoUrl"
                     className="relative block cursor-pointer w-24 h-24  object-cover rounded-full"
                  >
                     <img
                        src={image || photoUrl}
                        className=" w-full h-full object-cover rounded-full"
                        alt=""
                     />
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <MdOutlinePhotoCamera className=" text-2xl" />
                     </div>
                  </label>
                  <input
                     ref={imageRef}
                     type="file"
                     className="hidden"
                     id="photoUrl"
                     onChange={handleImageUpload}
                     name="photoUrl"
                  />
               </div>
               <div className="flex tabletXS:flex-col">
                  {/* Basic Info */}
                  <div className=" w-1/2 tabletXS:w-full">
                     <BasicInfo
                        fullName={fullName}
                        displayName={displayName}
                        email={email}
                        location={location}
                        occupation={occupation}
                        bio={bio}
                        availability={availability}
                        tags={tags}
                        handleChange={handleChange}
                        setValues={setValues}
                     />
                  </div>
                  {/* Social Info */}
                  <div className=" w-1/2 ms-8 tabletXS:w-full tabletXS:ms-0">
                     <SocialInfo
                        twitter={twitter}
                        instagram={instagram}
                        facebook={facebook}
                        github={github}
                        linkedIn={linkedIn}
                        website={website}
                        handleChange={handleChange}
                     />
                  </div>
               </div>

               <div className="mt-4 flex items-center justify-center">
                  <Button className=" w-[200px] p-2 rounded-[40px] font-bold text-white-50 bg-pink-600 ">
                     {' '}
                     {loading ? <BeatLoader size={10} color={'#fff'} /> : 'Update'}
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}

import { Input, Button, Container, Typography } from '../../components/element';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { useFormData } from '../../hooks/form/useFormData';
import { updateProfile } from '../../firebase/user';
import { useEffect, useState } from 'react';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { getUser } from '../../firebase/user';
import { BeatLoader } from 'react-spinners';

export const CreateAccountTemplate = () => {
   const navigate = useNavigate();
   const { user } = useAuthContext();
   const { theme } = useThemeContext();
   const [loading, setLoading] = useState<boolean>(false);

   const { values, handleChange, setValues } = useFormData({
      fullName: '',
      displayName: '',
      email: '',
      occupation: '',
      bio: '',
   });

   useEffect(() => {
      //if user is logged in, get user details
      if (user) {
         const getDetails: any = async () => {
            let uid;

            if (user) {
               uid = user.uid;
            }
            try {
               const userData = await getUser(uid);
               console.log(userData);
               const { fullName, email } = userData;
               setValues({
                  ...values,
                  fullName: fullName,
                  email: email,
               });
            } catch (error) {
               console.log(error);
            }
         };
         getDetails();
      }
   }, [user]);

   const { fullName, displayName, email, occupation, bio } = values;

   //disable next button if all fields are empty
   const isNextDisabled = !fullName || !displayName || !email || !occupation || !bio;

   //function to handle add profile details
   const handleAddProfileDetails = async () => {
      if (user) {
         setLoading(true);
         try {
            let uid = user.uid;
            const { userProfileRefId } = await updateProfile(uid, {
               uid,
               fullName,
               displayName,
               email,
               occupation,
               bio,
            });

            if (userProfileRefId) {
               navigate('/onboard/reason');
            }
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
      }
   };

   //function to handle next
   const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddProfileDetails();
   };

   return (
      <Container
         className={`flex flex-col justify-center items-center h-screen tabletS:pt-12 tabletS:h-full  transition duration-500 ease-in-out
        ${
           theme === 'lightMode'
              ? 'text-black-950 bg-white-50'
              : theme === 'darkMode' && 'text-white-100 bg-gray-800'
        }
        `}
      >
         <Typography
            variant={3}
            className="text-3xl mt-4 mb-3 pt-3 font-bold mobileL:text-2xl text-center"
         >
            Create Your Account
         </Typography>

         <div className=" italic ">Lets start your writing Journey</div>

         <div className=" pb-12">
            <form onSubmit={handleNext}>
               <div className=" flex tabletS:flex-col justify-center items-center">
                  <div className="flex  flex-col me-4 tabletS:me-0">
                     <label htmlFor="fullName" className="block mb-3 font-semibold mt-3">
                        Full Name
                     </label>
                     <Input
                        type="text"
                        className=" bg-white-100 rounded-md w-[300px] mobileM:w-280px 
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
                        placeholder="John Doe"
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="flex  flex-col">
                     <label htmlFor="displayName" className="block mb-3 font-semibold mt-3">
                        Display Name
                     </label>
                     <Input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={displayName}
                        onChange={handleChange}
                        className=" bg-white-100
                            transition duration-500 ease-in-out
                            rounded-md focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold w-[300px] mobileM:w-280px "
                        placeholder="John Doe"
                     />
                  </div>
               </div>
               <div className=" flex tabletS:flex-col justify-center items-center">
                  <div className="flex  flex-col me-4 tabletS:me-0">
                     <label htmlFor="email" className="block mb-3 font-semibold mt-3">
                        Email
                     </label>
                     <Input
                        type="email"
                        className=" bg-white-100 focus:border
                            transition duration-500 ease-in-out
                            focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold rounded-md w-[300px] mobileM:w-280px "
                        placeholder="johndoe@gmail.com"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        name="email"
                     />
                  </div>

                  <div className="flex  flex-col">
                     <label htmlFor="occupation" className="block mb-3 font-semibold mt-3">
                        Occupation
                     </label>
                     <Input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={occupation}
                        onChange={handleChange}
                        required
                        className=" bg-white-100
                            transition duration-500 ease-in-out
                            rounded-md focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold w-[300px] mobileM:w-280px "
                        placeholder="Software Engineer"
                     />
                  </div>
               </div>

               <div className="flex  flex-col">
                  <label htmlFor="bio" className="block mb-3 font-semibold mt-3">
                     Bio: Tell us who you are
                  </label>
                  <textarea
                     className="h-[80px] w-[300px] mobileM:w-280px
                            outline-none focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold
                            transition duration-500 ease-in-out
                            rounded-md bg-white-100"
                     id="bio"
                     value={bio}
                     required
                     placeholder="Tell us who you are"
                     name="bio"
                     onChange={handleChange}
                  />
               </div>

               <div className="mt-4">
                  <Button
                     disabled={isNextDisabled}
                     className={` flex items-center justify-center bg-pink-600 text-white-50 p-2 font-semibold rounded-[40px] w-[100px] ${
                        isNextDisabled && 'opacity-50 cursor-not-allowed'
                     }`}
                  >
                     {loading ? (
                        <span>
                           {' '}
                           <BeatLoader color="#ffffff" size={10} />{' '}
                        </span>
                     ) : (
                        'Next'
                     )}
                  </Button>
               </div>
            </form>
         </div>
      </Container>
   );
};

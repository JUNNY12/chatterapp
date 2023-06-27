import { Button, Container, Typography } from '../../components/element';
import { useNavigate } from 'react-router-dom';
import { googleSignin } from '../../firebase/auth';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { addProfileDetails } from '../../firebase/user';
import { getUser } from '../../firebase/user';

export const Onboard = () => {
   const navigate = useNavigate();
   const { theme } = useThemeContext();

   //function to handle sign in
   const handleGoogleSignIn = async () => {
      try {
         const { result } = await googleSignin();
         //if user is signed in
         if (result) {
            const uid = result.user?.uid;
            const userData = await getUser(uid);

            //check if user already onboarded
            if (userData.status === 'onboarded') {
               navigate('/feed');
            }
            //if user is not onboarded yet then redirect to create account
            else {
               navigate('/onboard/create-account');
               // console.log(result);
               const updatedData = {
                  fullName: result.user?.displayName,
                  email: result.user?.email,
                  photoUrl: result.user?.photoURL,
               };
               await addProfileDetails(uid, updatedData);
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   //function to handle facebook sign in
   // const handleFacebookSignIn = async () => {
   //    try {
   //       const result = await facebookSignin();
   //       if (result) {
   //          const { token, userInfo } = result;
   //          console.log(token, userInfo);
   //       } else {
   //          // Handle null case
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   return (
      <Container
         className={` h-screen transition duration-500 ease-in-out flex items-center flex-col
        ${
           theme === 'lightMode'
              ? 'text-black-950 bg-white-50'
              : theme === 'darkMode' && 'text-white-100 bg-gray-800'
        }
        `}
      >
         <div className=" h-[500px] flex items-center justify-center flex-col">
            <Typography variant={3} className="text-3xl mb-6 font-bold">
               Sign up / Login
            </Typography>

            <div className=" flex flex-col ">
               <Button
                  onClick={handleGoogleSignIn}
                  className=" bg-pink-600 text-white-50  mb-6 shadow-sm shadow-white-100 flex items-center w-[250px] rounded-[40px] p-2"
               >
                  <span className="relative block w-8 h-8 me-4">
                     {' '}
                     <img src="icons/google.svg" alt="google" />
                  </span>
                  <span className="font-semibold">Continue with Google</span>
               </Button>
               {/* <div>
                  <Typography variant={2} className="mb-6 text-center text-2xl font-bold">
                     or
                  </Typography>
               </div>
               <Button
                  onClick={handleFacebookSignIn}
                  className=" bg-pink-600 w-[250px] flex items-center shadow-sm shadow-white-100 text-white-50 rounded-[40px] p-2"
               >
                  <span className="relative block w-8 h-8 me-4">
                     <img src="/icons/facebook.svg" alt="facebook" />
                  </span>
                  <span className="font-semibold">Continue with Facebook</span>
               </Button> */}
            </div>
         </div>
      </Container>
   );
};

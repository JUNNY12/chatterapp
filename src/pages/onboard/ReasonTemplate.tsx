import { useReducer, useState } from 'react';
import { Typography, Button, Container } from '../../components/element';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../firebase/user';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { userTypeReducer } from '../../reducers';
import { StateProps } from '../../reducers';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { BeatLoader } from 'react-spinners';

export const ReasonTemplate = (): React.JSX.Element => {
   const navigate = useNavigate();
   const { user } = useAuthContext();
   const { theme } = useThemeContext();
   const [loading, setLoading] = useState<boolean>(false);

   //initial state
   const initialState: StateProps = {
      isReader: false,
      isWriter: false,
   };

   const [state, dispatch] = useReducer(userTypeReducer, initialState);
   const { isReader, isWriter } = state;

   //function to handle select reader
   const handleSelectReader = () => {
      dispatch({ type: 'SELECT_READER' });
   };
   //function to handle select writer
   const handleSelectWriter = () => {
      dispatch({ type: 'SELECT_WRITER' });
   };

   const handleNext = async () => {
      if (user) {
         let uid = user.uid;
         setLoading(true);
         try {
            const userType = {
               isReader,
               isWriter,
            };
            const { userProfileRefId } = await updateProfile(uid, {
               userType: userType,
            });
            if (userProfileRefId) {
               navigate('/onboard/interested-tag');
            }
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
      }
   };

   return (
      <Container
         className={` transition duration-500 ease-in-out h-screen pt-12
         ${
            theme === 'lightMode'
               ? 'text-black-950 bg-white-50'
               : theme === 'darkMode' && 'text-white-100 bg-gray-800'
         }`}
      >
         <Typography variant={3} className="text-3xl mb-6 font-bold mobileL:text-2xl text-center">
            Why do you want to use Chatter?
         </Typography>

         <div className="pb-6">
            <div
               onClick={handleSelectWriter}
               data-id="writer"
               className={`mb-4 p-4 rounded-md shadow-sm shadow-black-900 
                    ${
                       theme === 'lightMode'
                          ? 'bg-white-100'
                          : theme === 'darkMode' && 'bg-gray-900'
                    }
                     hover:shadow-black-950 
                    focus:border focus:border-pink-600 w-[400px] mobileXL:w-full h-max cursor-pointer
                    transition duration-500 ease-in-out
                    ${isWriter && 'border-2 border-pink-600'} 
                    `}
            >
               <Typography variant={4} className="text-2xl mb-3 font-bold">
                  writer
               </Typography>

               <p> Share part of my knowledge</p>
            </div>

            <div
               onClick={handleSelectReader}
               data-id="reader"
               className={`mb-4 p-4 rounded-md shadow-sm shadow-black-900 transition duration-500 ease-in-out 
                    ${
                       theme === 'lightMode'
                          ? 'bg-white-100'
                          : theme === 'darkMode' && 'bg-gray-900'
                    }
                     hover:shadow-black-950 
                    focus:border focus:border-pink-600 w-[400px] mobileXL:w-full h-max cursor-pointer
                    ${isReader && 'border-2 border-pink-600'} 
                    `}
            >
               <Typography variant={4} className="text-2xl mb-3 font-bold">
                  Reader
               </Typography>
               <p> I am here to read articles</p>
            </div>

            <div className="mt-4">
               <Button
                  onClick={handleNext}
                  className=" bg-pink-600 text-white-50 p-2 font-semibold rounded-[40px] w-[100px]"
               >
                  {loading ? <BeatLoader size={8} color={'#ffffff'} /> : 'Next'}
               </Button>
            </div>
         </div>
      </Container>
   );
};

import { Button, Container, Input, Typography } from '../../components/element';
import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchTag } from './SearchTag';
import { FaPlus } from 'react-icons/fa';
import { tagReducer, TagState } from '../../reducers';
import { updateProfile } from '../../firebase/user';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { BeatLoader } from 'react-spinners';
import { Tags } from '../../config/constants/tags';

export const InterestedTagTemplate = () => {
   const { user } = useAuthContext();
   const [query, setQuery] = useState<string>('');
   const { theme } = useThemeContext();
   const [loading, setLoading] = useState<boolean>(false);

   const initialState: TagState = { tags: [] };
   const [selectedTags, dispatch] = useReducer(tagReducer, initialState);

   const navigate = useNavigate();

   //function to handle query
   const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
   };

   const handleAddTag = (tag: string) => {
      dispatch({
         type: 'ADD_TAG',
         payload: { tag },
      });
   };

   const isSelected = (tag: string) => {
      return selectedTags.tags.includes(tag);
   };

   const disabledNext = selectedTags.tags.length <= 1;

   const handleNext = async () => {
      if (user) {
         setLoading(true);
         let uid = user.uid;
         try {
            const { userProfileRefId } = await updateProfile(uid, {
               tags: selectedTags.tags,
            });
            await updateProfile(uid, {
               status: 'onboarded',
            });

            if (userProfileRefId) {
               navigate('/onboard/finish');
            }
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
      }
   };

   return (
      <Container
         className={` h-screen pt-8 transition duration-500 ease-in-out
         ${
            theme === 'lightMode'
               ? 'text-black-950 bg-white-50'
               : theme === 'darkMode' && 'text-white-100 bg-gray-800'
         }`}
      >
         <Typography variant={3} className=" text-3xl mb-4 font-bold text-center">
            Choose Your tags
         </Typography>

         <p className="text-lg mb-3 text-center">
            Your feed will be personalize based on your tags.
         </p>

         <div className="mb-6">
            <Input
               type="text"
               placeholder="Search for tags"
               name="query"
               value={query}
               onChange={handleQuery}
               className=" bg-white-100 focus:border  text-black-950
                       transition duration-500 ease-in-out
                       focus:border-pink-600 indent-3 rounded-md w-[300px] mobileM:w-[280px]"
            />
         </div>

         <div className=" relative">
            <div>
               {!query && (
                  <div className="flex flex-wrap items-center justify-center tabletS:h-[200px] tabletS:overflow-auto">
                     {Tags.slice(0, 10).map((tag, index) => (
                        <div
                           onClick={() => handleAddTag(tag)}
                           key={index}
                           className={`p-2 me-3 mb-3 cursor-pointer rounded-[20px] w-max text-center shadow-sm shadow-black-900
                                    hover:shadow-md hover:shadow-black-950 transition duration-500 ease-in-out
                                    focus:border focus:border-pink-600
                                    ${
                                       isSelected(tag)
                                          ? 'bg-pink-600 text-white-50'
                                          : 'bg-white-100 text-black-900'
                                    }
                                    `}
                        >
                           <Typography
                              variant={4}
                              className="text-[12px] font-bold inline-flex items-center"
                           >
                              <span> {tag} </span>
                              <span>
                                 {' '}
                                 <FaPlus />{' '}
                              </span>
                           </Typography>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {query && (
               <SearchTag query={query} handleAddTag={handleAddTag} isSelected={isSelected} />
            )}
         </div>

         <div className="mt-8 pb-12">
            <Button
               disabled={disabledNext}
               onClick={handleNext}
               className={` bg-pink-600 text-white-50 p-2 font-semibold rounded-[40px] w-[100px]
                    ${disabledNext && 'opacity-50 cursor-not-allowed'}
                    `}
            >
               {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Next'}
            </Button>
         </div>
      </Container>
   );
};

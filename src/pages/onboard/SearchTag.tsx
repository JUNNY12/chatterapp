import { Tags } from '../../config/constants/tags';
import { Typography } from '../../components/element';
import { FaPlus } from 'react-icons/fa';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

interface Props {
   query: string;
   handleAddTag: (tag: string) => void;
   isSelected: (tag: string) => boolean;
}

export const SearchTag = ({ query, handleAddTag, isSelected }: Props) => {
   const { theme } = useThemeContext();

   const filteredTags = Tags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase()));

   return (
      <div
         className={` transition duration-500 ease-in-out ${
            theme === 'lighMode' ? 'bg-white-50' : theme === 'darkMode' && 'bg-gray-900'
         } shadow-sm shadow-black-900 p-3 z-20`}
      >
         <div className="flex justify-center items-center flex-wrap h-[200px] overflow-auto">
            {filteredTags.length > 0 ? (
               filteredTags.map((tag, index) => (
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
                        <span className="me-2"> {tag} </span>
                        <span>
                           {' '}
                           <FaPlus />{' '}
                        </span>
                     </Typography>
                  </div>
               ))
            ) : (
               <div
                  onClick={() => handleAddTag(query)}
                  className={`p-2 me-3 mb-3 cursor-pointer rounded-[20px] w-max text-center shadow-sm shadow-black-900
                      hover:shadow-md hover:shadow-black-950 transition duration-500 ease-in-out
                      focus:border focus:border-pink-600
                      ${
                         isSelected(query)
                            ? 'bg-pink-600 text-white-50'
                            : 'bg-white-100 text-black-900'
                      }
                      `}
               >
                  <Typography
                     variant={4}
                     className="text-[12px] font-bold inline-flex items-center"
                  >
                     <span className="me-2"> {query} </span>
                     <span>
                        {' '}
                        <FaPlus />{' '}
                     </span>
                  </Typography>
               </div>
            )}
         </div>
      </div>
   );
};

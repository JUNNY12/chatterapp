import { useSearch } from '../hooks/search/useSearch';
import { useThemeContext } from '../hooks/theme/useThemeContext';
import { Typography } from './element';
import { useNavigate } from 'react-router';

export const SearchContainer = (): React.JSX.Element => {
   const {
      state: { searchResults },
      setSearchTerm,
   } = useSearch();

   const { posts, users } = searchResults;

   const allResults = [...posts, ...users];
   console.log(allResults);

   const { theme } = useThemeContext();
   const navigate = useNavigate();

   // Navigate to post page
   const handleNavigate = (fullName: string, slug: string) => {
      navigate(`/post/${fullName.split(' ').join('_')}/${slug.split(' ').join('_')}`);
      setSearchTerm('');
   };

   // Navigate to user page
   const handleNavigateUser = (displayName: string) => {
      const formattedDisplayName = displayName.trim();
      navigate(`/user/${formattedDisplayName}`);
      setSearchTerm('');
   };

   return (
      <div>
         <div
            className={`
            fixed w-[700px] tabletS:w-[400px] mobileXL:w-[300px] mobileM:w-[280px]  p-4 mobileXL:p-2 
            h-[400px] overflow-auto top-1/2 left-[50%]
            transform -translate-x-1/2 -translate-y-1/2 rounded-lg
            drop-shadow-2xl  z-50
            ${
               theme === 'lightMode'
                  ? 'bg-white-50 text-black-900'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            }
            `}
         >
            <div>
               {allResults.length === 0 && (
                  <div className="text-center pt-24">
                     <Typography variant={1} className="text-3xl font-bold">
                        !!!Oops
                     </Typography>
                     <Typography variant={2} className="text-xl font-sem-bold mt-6">
                        No content found for your search
                     </Typography>
                  </div>
               )}
            </div>
            <div>
               {allResults.map((result: any) => {
                  if (result.hasOwnProperty('title')) {
                     // Displaying post result
                     const { slug, author } = result;
                     const { fullName } = author;
                     return (
                        <div
                           key={result?.id}
                           onClick={() => handleNavigate(fullName, slug)}
                           className={`flex items-center mb-6 cursor-pointer transition duration-500 ease-in-out
                            ${
                               theme === 'lightMode'
                                  ? 'hover:bg-gray-300 p-2'
                                  : theme === 'darkMode' && 'hover:bg-white-600 p-2'
                            }
                            `}
                        >
                           {result?.coverImage && (
                              <div className="w-[40px] me-4">
                                 <div className="w-12 h-12 object-cover me-3">
                                    <img
                                       src={result?.coverImage}
                                       alt=""
                                       className="w-full h-full object-cover"
                                    />
                                 </div>
                              </div>
                           )}
                           <div className="text-base">{result?.title}</div>
                        </div>
                     );
                  } else if (result.hasOwnProperty('displayName')) {
                     // Displaying user result
                     const { displayName, photoUrl } = result;
                     return (
                        <div
                           onClick={() => handleNavigateUser(displayName)}
                           key={result?.uid}
                           className={`flex items-center mb-6 cursor-pointer transition duration-500 ease-in-out
                            ${
                               theme === 'lightMode'
                                  ? 'hover:bg-gray-300 p-2'
                                  : theme === 'darkMode' && 'hover:bg-white-600 p-2'
                            }
                            `}
                        >
                           {photoUrl && (
                              <div className="w-[40px] me-4">
                                 <div className="w-12 h-12 object-cover rounded-full me-3">
                                    <img
                                       src={photoUrl}
                                       alt=""
                                       className="w-full h-full object-cover rounded-full"
                                    />
                                 </div>
                              </div>
                           )}
                           <div className="text-base">{displayName}</div>
                        </div>
                     );
                  }
               })}
            </div>
         </div>
      </div>
   );
};

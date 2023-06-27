import { MdPhoto } from 'react-icons/md';
import { useArticleContext } from '../../hooks/article/useArticleContext';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import firebaseApp from '../../firebase/config';
import { handleCustomImageUpload } from '../../firebase/upload/handleCustomImageUpload';
import { ref, getStorage } from 'firebase/storage';
import { useRef } from 'react';
import { Tags } from '../../config/constants/tags';
import { Typography } from '../../components/element';
import { FaPlus } from 'react-icons/fa';

export const Header = (): React.JSX.Element => {
   const {
      setArticle,
      handleOnChange,
      tagQuery,
      handleTagQuery,
      addTag,
      article: { title, subtitle, tagList, coverImage },
   } = useArticleContext();
   const { user } = useAuthContext();
   const imageRef = useRef<any>(null);

   //filtering tags
   const filteredTags = Tags.filter((tag: any) =>
      tag.toLowerCase().includes(tagQuery?.toLowerCase())
   );

   //check if tags are selected
   const isSelected = (tag: string) => {
      return tagList?.includes(tag);
   };

   //initilaize storage
   const storage = getStorage(firebaseApp);

   //handle cover image upload
   const handleImageUpload = async (e: any) => {
      e.preventDefault();

      const imageFile = imageRef.current?.files?.[0];
      console.log(imageFile);
      const storageRef = ref(storage, `${user?.uid}/articleImage/${imageFile?.name}`);

      try {
         const downloadURL = await handleCustomImageUpload(storageRef, imageFile);
         if (user) {
            setArticle((prevState) => ({
               ...prevState,
               coverImage: downloadURL as string,
            }));
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="ms-[250px] tabletS:ms-0">
         <div className="flex">
            <div className=" me-3">
               <label htmlFor="coverImage" className="inline-flex items-center text-black-600">
                  <span>
                     <MdPhoto />
                  </span>
                  <span className="ms-2">
                     {coverImage ? (
                        <Typography variant={3} className="text-green-600 font-bold">
                           Uploaded Successfully
                        </Typography>
                     ) : (
                        <Typography variant={3} className="text-black-600">
                           Upload Cover Image
                        </Typography>
                     )}
                  </span>
               </label>
               <input
                  type="file"
                  id="coverImage"
                  className="bg-transparent hidden "
                  ref={imageRef}
                  onChange={handleImageUpload}
               />
            </div>

            <div className="">
               <textarea
                  value={subtitle}
                  onChange={handleOnChange}
                  name="subtitle"
                  placeholder="Add Subtitle"
                  className="bg-transparent font-bold outline-none w-full border-none text-black-600 "
               />
            </div>
         </div>

         <div className="my-3">
            <textarea
               value={title}
               onChange={handleOnChange}
               name="title"
               placeholder="Article Title"
               className="bg-transparent text-2xl outline-none w-full border-none font-bold text-black-600"
            />
         </div>

         <div>
            <input
               value={tagQuery}
               onChange={handleTagQuery}
               name="tagQuery"
               type="search"
               className=" bg-white-50 p-2 rounded-sm  border-none outline-none max-w-[500px] w-full"
               placeholder="Add your tags"
            />
         </div>

         <div>
            {tagQuery && (
               <div className="flex justify-center items-center flex-wrap h-[200px] overflow-auto">
                  {filteredTags.length > 0 ? (
                     filteredTags.map((tag, index) => (
                        <div
                           onClick={() => addTag(tag)}
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
                        onClick={() => addTag(tagQuery)}
                        className={`p-2 me-3 mb-3 cursor-pointer rounded-[20px] w-max text-center shadow-sm shadow-black-900
                      hover:shadow-md hover:shadow-black-950 transition duration-500 ease-in-out
                      focus:border focus:border-pink-600
                      ${
                         isSelected(tagQuery)
                            ? 'bg-pink-600 text-white-50'
                            : 'bg-white-100 text-black-900'
                      }
                      `}
                     >
                        <Typography
                           variant={4}
                           className="text-[12px] font-bold inline-flex items-center"
                        >
                           <span className="me-2"> {tagQuery} </span>
                           <span>
                              {' '}
                              <FaPlus />{' '}
                           </span>
                        </Typography>
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

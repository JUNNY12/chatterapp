import { Typography } from '../../element';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useState } from 'react';

export const PostSideBar = () => {
   const [showDraft, setShowDraft] = useState(false);
   const [showPublished, setShowPublished] = useState(false);

   const handleShowDraft = () => {
      setShowDraft(!showDraft);
   };

   const handleShowPublished = () => {
      setShowPublished(!showPublished);
   };

   return (
      <div>
         <div>
            <Typography
               onClick={handleShowDraft}
               role="button"
               variant={2}
               className="mb-3 font-semibold text-xl flex cursor-pointer justify-between "
            >
               <span className="inline-block">Drafts</span>
               <span>
                  {!showDraft ? (
                     <FaCaretDown className="inline-block mb-2" />
                  ) : (
                     <FaCaretUp className="inline-block mb-2" />
                  )}
               </span>
            </Typography>
            {showDraft && (
               <ul className="font-normal text-lg">
                  <li className="mb-3">Draft 1</li>
                  <li className="mb-3">Draft 2</li>
               </ul>
            )}
         </div>

         <div>
            <Typography
               onClick={handleShowPublished}
               role="button"
               variant={2}
               className="mb-3 font-semibold text-xl flex cursor-pointer justify-between"
            >
               <span className="inline-block">Published</span>
               <span>
                  {!showPublished ? (
                     <FaCaretDown className="inline-block mb-2" />
                  ) : (
                     <FaCaretUp className="inline-block mb-2" />
                  )}
               </span>
            </Typography>
            {showPublished && (
               <ul className={`font-normal text-lg `}>
                  <li className="mb-3">Post 1</li>
                  <li className="mb-3">Post 2</li>
               </ul>
            )}
         </div>
      </div>
   );
};

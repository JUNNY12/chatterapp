import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Header } from '.';
import { useArticleContext } from '../../hooks/article/useArticleContext';
import { Preview } from '.';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const mdParser = new MarkdownIt();

export const MarkdownEditor = ({
   onPublish,
   onSaveDraft,
   mode,
   onUpdate,
}: any): React.JSX.Element => {
   const { setArticle, article } = useArticleContext();
   const [isLoading, setIsLoading] = useState(false);
   const [isDraft, setIsDraft] = useState(false);
   const [isUpdate, setIsUpdate] = useState(false);

   const { body, title, tagList, subtitle } = article;

   const isDisabled = body === '' || title === '' || tagList.length === 0 || subtitle === '';
   const isDraftDisabled = body === '' || title === '';

   // handle editor change
   const handleEditorChange = ({ text }: any) => {
      setArticle((prevState) => ({
         ...prevState,
         body: text,
      }));
   };

   // handle submit
   const handlePublish = async (e: any) => {
      e.preventDefault();
      setIsLoading(true);
      await onPublish();
      setIsLoading(false);
   };

   // handle draft
   const handleDraft = async (e: any) => {
      e.preventDefault();
      setIsDraft(true);
      await onSaveDraft();
      setIsDraft(false);
   };

   // handle update
   const handleUpdate = async (e: any) => {
      e.preventDefault();
      setIsUpdate(true);
      await onUpdate();
      setIsUpdate(false);
   };

   return (
      <div className="mx-8 tabletS:mx-4 mb-8 relative">
         <form className="flex flex-col">
            <Header />
            <div className="ms-[250px] tabletS:ms-0  flex flex-wrap justify-end my-3 items-center">
               {mode === 'update' ? (
                  <div>
                     <button
                        title="update draft"
                        className="bg-pink-600 text-white-50 p-2 rounded-[40px] w-[200px] mobileXL:w-[100px] me-8"
                        onClick={handleUpdate}
                     >
                        {isUpdate ? <BeatLoader color="#ffffff" size={10} /> : 'Update'}
                     </button>
                     <button
                        title="publish draft"
                        className="bg-pink-600 text-white-50 p-2 rounded-[40px] w-[200px] mobileXL:w-[100px] me-8"
                        onClick={handlePublish}
                     >
                        {isLoading ? <BeatLoader color="#ffffff" size={10} /> : 'Publish'}
                     </button>
                  </div>
               ) : (
                  <div>
                     <button
                        title="publish post"
                        className={`bg-pink-600 text-white-50 p-2 
                                rounded-[40px] w-[200px] mobileXL:w-[100px] me-8 
                                ${isDisabled && 'opacity-40'}
                                `}
                        onClick={handlePublish}
                        disabled={isDisabled}
                     >
                        {isLoading ? <BeatLoader color="#ffffff" size={10} /> : 'Publish'}
                     </button>

                     <button
                        disabled={isDraftDisabled}
                        title="save draft"
                        className={`
                        ${isDraftDisabled && 'opacity-40'}
                        bg-pink-600 text-white-50 p-2 rounded-[40px] w-[200px] mobileXL:w-[100px] me-8`}
                        onClick={handleDraft}
                     >
                        {isDraft ? <BeatLoader color="#ffffff" size={10} /> : 'Draft'}
                     </button>
                  </div>
               )}
            </div>

            <MdEditor
               className="ms-[250px] h-[400px] tabletS:ms-0"
               renderHTML={(text) => mdParser.render(text)}
               onChange={handleEditorChange}
               value={body}
               shortcuts={true}
               view={{ menu: true, md: true, html: false }}
               canView={{
                  menu: true,
                  md: true,
                  html: false,
                  both: false,
                  fullScreen: false,
                  hideMenu: false,
               }}
            />
         </form>
         <Preview />
      </div>
   );
};

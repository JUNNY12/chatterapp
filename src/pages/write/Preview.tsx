import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import {
   paragraphStyle,
   heading1,
   heading2,
   heading3,
   heading4,
   heading5,
   heading6,
   orderedListStyle,
   unorderedListStyle,
} from '..';
import { useArticleContext } from '../../hooks/article/useArticleContext';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../../components/element';

export const Preview = (): React.JSX.Element => {
   const {
      tagQuery,
      article: { body, coverImage, title, subtitle, tagList },
   } = useArticleContext();

   const showPreview = body || coverImage || title || subtitle || tagList || tagQuery;

   const { theme } = useThemeContext();

   return (
      <>
         {showPreview && (
            <section
               className={` ms-[250px] mt-8 tabletS:ms-0
      transition duration-500 ease-in-out
      ${
         theme === 'lightMode'
            ? 'bg-white-50 text-black-950'
            : theme === 'darkMode' && 'bg-gray-800 text-white-100'
      }`}
            >
               <div className=" max-w-[600px] p-4 ">
                  <Typography variant={2}>
                     <span className="text-pink-600 text-xl mb-6 font-semibold">Preview</span>
                  </Typography>
                  <div>
                     {coverImage && (
                        <div className="relative max-w-[600px] h-[300px] mb-3 object-cover">
                           <img
                              src={coverImage}
                              alt={title}
                              className=" h-full w-full object-cover"
                           />
                        </div>
                     )}

                     <div>
                        <Typography
                           variant={1}
                           className=" font-semibold text-3xl tabletXS:text-2xl mb-3 break-words"
                        >
                           {title}
                        </Typography>

                        <Typography variant={2} className="text-xl mb-3 break-words">
                           {subtitle}
                        </Typography>
                        <div className="flex flex-wrap items-center my-3">
                           {tagList.map((tag, index) => (
                              <div key={index} className="me-1">
                                 <span> # </span>
                                 <span className=" me-2 text-sm font-semibold text-pink-600">
                                    {tag}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     children={body as string}
                     className=" break-words"
                     components={{
                        p: ({ children }) => <p style={paragraphStyle}>{children}</p>,
                        h1: ({ children }) => <h1 style={heading1}>{children}</h1>,
                        h2: ({ children }) => <h2 style={heading2}>{children}</h2>,
                        h3: ({ children }) => <h3 style={heading3}>{children}</h3>,
                        h4: ({ children }) => <h4 style={heading4}>{children}</h4>,
                        h5: ({ children }) => <h5 style={heading5}>{children}</h5>,
                        h6: ({ children }) => <h6 style={heading6}>{children}</h6>,
                        ol: ({ children }) => <ol style={orderedListStyle}>{children}</ol>,
                        ul: ({ children }) => <ul style={unorderedListStyle}>{children}</ul>,

                        code({ node, inline, className, children, ...props }) {
                           const match = /language-(\w+)/.exec(className || '');
                           return !inline && match ? (
                              <SyntaxHighlighter
                                 {...props}
                                 children={String(children).replace(/\n$/, '')}
                                 style={atomDark}
                                 language={language}
                                 PreTag="div"
                              />
                           ) : (
                              <code {...props} className={` bg-gray-200 p-4 text-black-900`}>
                                 {children}
                              </code>
                           );
                        },
                     }}
                  />
               </div>
            </section>
         )}
      </>
   );
};

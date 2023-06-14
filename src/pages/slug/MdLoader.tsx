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
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const MdLaoder = ({ content }: any): React.JSX.Element => {
   const { theme } = useThemeContext();

   return (
      <section
         className={`
      transition duration-500 ease-in-out
      ${
         theme === 'lightMode'
            ? 'bg-white-50 text-black-950'
            : theme === 'darkMode' && 'bg-gray-800 text-white-100'
      }`}
      >
         <div className=" max-w-[600px]">
            <ReactMarkdown
               remarkPlugins={[remarkGfm]}
               children={content as string}
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
   );
};

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Header } from '.';
import { useArticleContext } from '../../hooks/article/useArticleContext';
import { Preview } from '.';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const mdParser = new MarkdownIt();

export const MarkdownEditor = ({ onSave, mode }: any): React.JSX.Element => {
    const { setArticle, article } = useArticleContext();
    const [isLoading, setIsLoading] = useState(false);

    const { body, title, tagList } = article;

    const isDisabled = body === '' || title === '' || tagList.length === 0;

    const handleEditorChange = ({ text }: any) => {
        setArticle((prevState) => ({
            ...prevState,
            createdAt: new Date().toISOString(),
            body: text,
            slug: title,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        await onSave();
        setIsLoading(false);
    };

    return (
        <div className="mx-8 tabletS:mx-4 mb-8 relative">
            <form className="flex flex-col">
                <Header />
                <div className="ms-[250px] tabletS:ms-0  flex flex-wrap justify-end my-3 items-center">
                    {mode === 'update' ? (
                        <button
                            className="bg-pink-600 text-white-50 p-2 rounded-[40px] w-[200px] mobileXL:w-[100px] me-8"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    ) : (
                        <div>
                            <button
                                className={`bg-pink-600 text-white-50 p-2 
                                rounded-[40px] w-[200px] mobileXL:w-[100px] me-8 
                                ${isDisabled && 'opacity-40'}
                                `}
                                onClick={handleSubmit}
                                disabled={isDisabled}
                            >
                                {isLoading ? <BeatLoader /> : 'Publish'}
                            </button>

                            <button
                                className="bg-pink-600 text-white-50 p-2 rounded-[40px] w-[200px] mobileXL:w-[100px] me-8"
                                onClick={handleSubmit}
                            >
                                Draft
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

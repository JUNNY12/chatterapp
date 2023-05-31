import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useState } from 'react';


const mdParser = new MarkdownIt(/* Markdown-it options */);

export const MarkdownEditor = () => {
    const [content, setContent] = useState('');

    console.log(content);

    const handleEditorChange = ({ text }: any) => {
        setContent(text);
    };

    return (
        <div className="w-full h-full">
            <MdEditor
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        </div>
    );
}


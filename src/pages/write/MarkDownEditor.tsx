import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useState } from 'react';


const mdParser = new MarkdownIt(/* Markdown-it options */);

export const MarkdownEditor = () => {
    const [content, setContent] = useState('');

    const handleEditorChange = ({ text }:any) => {
        setContent(text);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(JSON.stringify(content));
    };
 

    return (
        <div className="mx-8 tabletS:mx-4 mb-8">
          
            <form action="" onSubmit={handleSubmit}>
                <MdEditor
                    
                onImageUpload={  (file:any) => new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onload = data => resolve(data.target?.result);
                    reader.readAsDataURL(file);
                  }

                    )
                }
                    className="ms-[250px] h-[500px] tabletS:ms-0"
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />

                <div>
                    <button className='bg-red-500'>Submit</button>
                </div>
            </form>

            <div className="markdown-content bg-white-50 ms-[250px]">
                {content}
                </div>
        </div>
    );
};

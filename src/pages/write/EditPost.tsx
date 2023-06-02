import { MarkdownEditor } from '.';
import { useArticleContext } from '../../hooks/article/useArticleContext';

export default function PostPage() {
    const { article } = useArticleContext();

    const handleUpdate = () => {
        console.log('handleUpdate');
    };

    return (
        <section className=" pt-32  bg-white-100">
            <div>
                <MarkdownEditor
                    content={article}
                    onSave={handleUpdate}
                    mode="update"
                />
            </div>
        </section>
    );
}

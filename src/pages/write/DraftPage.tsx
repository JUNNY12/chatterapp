import { useArticleContext } from '../../hooks/article/useArticleContext';
import { MarkdownEditor } from '.';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { publishArticle } from '../../firebase/article';
import { getUser } from '../../firebase/user';
import { useNavigate } from 'react-router';
import { useState ,useEffect} from 'react';

export default function DraftPage() {
    const { article, clearArticle , setArticle} = useArticleContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        authorId: '',
        displayName: '',
        fullName: '',
        bio: '',
        photoUrl: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                try {
                    const userData = await getUser(user.uid);
                    console.log(userData);
                    if (userData.length > 0) {
                        const { displayName, fullName, bio, photoUrl } = userData[0].data;
                        setAuthor({
                            authorId: user.uid,
                            displayName: displayName || '',
                            fullName: fullName || '',
                            bio: bio || '',
                            photoUrl: photoUrl || '',
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchUser();
    }, [user]);


    const redirect = async () => {
        navigate('/settings/post');
    };

    const handlePublish = async () => {
        console.log('handleDraft');
        setArticle(prevState => ({
            ...prevState,
            author: author,
            slug: `${author.displayName}/${article?.title}`,
            createdAt: new Date().toISOString(),
        }));
        
        try {
           
            console.log(article);
            // await publishArticle(user?.uid, article);
            // await redirect();
            clearArticle();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="pt-32  bg-white-100 relative">
            <div>
                <MarkdownEditor content={article} onSave={handlePublish} />
            </div>
        </section>
    );
}

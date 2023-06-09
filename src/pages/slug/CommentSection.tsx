import { Typography } from '../../components/element';
import { FaCaretDown } from 'react-icons/fa';
import { Comment } from '../../context/article/FetchAllPostContext';
import { getUser } from '../../firebase/user';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import { BiComment } from 'react-icons/bi';
import formatTime from '../../utils/formatTime';

interface CommentProps {
    comments: Comment[];
}
export const CommentSection = ({
    comments,
}: CommentProps): React.JSX.Element => {
    const [updated, setUpdated] = useState<any>([]);
    const [showComment, setShowComment] = useState(false);

    const getCommentsWithUserInfo = async () => {
        try {
            const sortedComments = comments?.sort((a: any, b: any) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });

            const getAllcomments = await Promise.all(
                sortedComments.map(async (comment) => {
                    const user = await getUser(comment.commentorId);
                    return {
                        ...comment,
                        user,
                    };
                })
            );
            console.log('getAllcomments', getAllcomments);
            setUpdated(getAllcomments);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        getCommentsWithUserInfo();
    }, []);

    console.log(updated);
    return (
        <section>
            <div className=" mt-12">
                <Typography
                    onClick={() => setShowComment(!showComment)}
                    role="button"
                    className=" inline-flex items-center text-2xl"
                    variant={2}
                >
                    <span>Show Comments</span>
                    <span>
                        <FaCaretDown />
                    </span>
                </Typography>
            </div>

            {showComment && (
                <div>
                    {updated?.map((comment: any) => {
                        return (
                            <div key={comment.commentId} className=" mt-12">
                                <div className="flex items-center">
                                    <div className=" w-12 h-12 rounded-full object-cover ">
                                        <img
                                            src={comment.user?.photoUrl}
                                            alt="user"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="ms-4">
                                        <Typography
                                            className=" text-xl font-bold mobileL:text-base"
                                            variant={2}
                                        >
                                            {comment.user?.fullName}
                                        </Typography>

                                        <Typography
                                            className=" text-[14px]"
                                            variant={2}
                                        >
                                            {comment.user?.occupation}
                                        </Typography>

                                        <Typography
                                            className="text-[12px]"
                                            variant={2}
                                        >
                                            <span>
                                                {formatDate(comment.createdAt)}
                                            </span>
                                            <span className=" ms-4">
                                                {formatTime(comment.createdAt)}
                                            </span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="mt-4 text-lg  p-4 rounded-md bg-gray-300 text-black-900">
                                    <p>{comment.comment}</p>

                                    <div className="mt-4 flex items-center">
                                        <div className="me-4">
                                            <Typography
                                                className="text-[14px]"
                                                variant={2}
                                            >
                                                <BiComment className="inline-block me-2" />
                                                Reply
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

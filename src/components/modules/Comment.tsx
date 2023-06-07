import { Input } from '../element';
import { useFetchUser } from '../../hooks/user/useFetchUser';

interface CommentProps {
    value: string | undefined;
    onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Comment = ({
    value,
    onCommentChange,
    onCommentSubmit,
}: CommentProps): React.JSX.Element => {
    const { userInfo, loading } = useFetchUser();
    console.log(loading)

    return (
        <div className="flex items-center mobileM:justify-center">
            <div>
                <div className=" w-[40px] h-[40px] me-4 rounded-full object-cover">
                    <img
                        src={userInfo?.photoUrl}
                        alt={userInfo?.displayName}
                        className="rounded-full object-cover w-full h-full"
                    />
                </div>
            </div>
            <div>
                <form action="" onSubmit={onCommentSubmit}>
                    <Input
                        className="bg-gray-100 outline-pink-600 w-[350px]
                        mobileXL:w-[300px] mobileL:w-[250px] mobileM:w-[230px] mobileS:w-full text-black-900
                        h-[50px] rounded-sm p-2"
                        value={value}
                        onChange={onCommentChange}
                        placeholder="Add a comment..."
                    />
                </form>
            </div>
        </div>
    );
};

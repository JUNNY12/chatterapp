import { Typography } from "../../components/element"
import { FaCaretDown } from "react-icons/fa"
import { Comment } from "../../context/article/FetchAllPostContext"
import { getUser } from "../../firebase/user"
import { useState, useEffect } from "react"

interface CommentProps {
    comments: Comment[];
}
export const CommentSection = ({comments}:CommentProps):React.JSX.Element => {
    const [userInfo, setUserInfo] = useState<any>({})
    
    const getUserInfo = async (userId:string) => {
        try{
            const userDetail = await getUser(userId)
            setUserInfo(userDetail)
        }
        catch(err){
            console.log(err)
        }
    }

    // console.log(userInfo)

    useEffect(() => {
        comments.forEach((comment:any) => {
            getUserInfo(comment?.commentorId); // Pass the userId from the comment to getUserInfo
        });
    }, [comments])
    return (
        <section>
            <div className=" mt-6">
                <Typography
                    role="button"
                    className=" inline-flex items-center text-2xl" variant={2}>
                    <span>Show Comments</span>
                    <span><FaCaretDown /></span>
                </Typography>

            </div>

            <div>
                {
                    comments.map(comment => {
                        const {commentId} = comment
                        // console.table(commentId)
                        // console.table(comment)
                        return(
                            <div key={commentId}>hello</div>
                        )
                    })
                }
            </div>
        </section>
    )
}
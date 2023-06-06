import React from 'react';
import { Typography } from '../../components/element';
import { FaShare, FaComment } from 'react-icons/fa';
import { MdFavorite, MdInsights } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { calculateReadingTime } from '../../utils';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
interface PostProps {
    post: SinglePostInterface;
}

export const Post = ({ post }: PostProps): React.JSX.Element => {
    const {
        title,
        coverImage,
        subtitle,
        tagList,
        author = {} as any,
        createdAgo,
        slug,
        body,
        likeCounts,
        views,
        comments,
    } = post;


    const { displayName, photoUrl, fullName, occupation } = author[0].data;

    const navigate = useNavigate();
    const { theme } = useThemeContext();

    return (
        <div
            className={`rounded-md m-8 tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${
             theme === 'lightMode'
                 ? 'bg-white-50 text-black-950'
                 : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
        >
            <article className="border-b border-gray-300 p-8 my-8 tabletXS:my-3 mobileXL:px-2 cursor-pointer">
                <div className=" flex items-center mb-3">
                    <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 relative rounded-full object-cover">
                        <img
                            src={photoUrl}
                            title={displayName}
                            alt={displayName}
                            className=" rounded-full object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <Typography
                            variant={1}
                            className="font-bold text-2xl mobileXL:text-lg"
                        >
                            {fullName}
                        </Typography>
                        <Typography
                            variant={2}
                            className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                        >
                            <span> {occupation} </span>
                            <span className=" ms-6 mobileXL:ms-3">
                                {createdAgo}
                            </span>
                        </Typography>
                    </div>
                </div>

                <div
                    onClick={() => {
                        navigate(
                            `/post/${fullName.split(' ').join('_')}/${slug
                                .split(' ')
                                .join('_')}`
                        );
                    }}
                >
                    <Typography
                        variant={1}
                        className=" text-3xl mobileXL:text-xl font-bold mb-2"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant={2}
                        className=" text-2xl mobileXL:text-lg font-normal mb-2"
                    >
                        {subtitle.substring(0, 75) + ' ... '}
                    </Typography>

                    <Typography variant={2} className="font-semibold mb-1">
                        {calculateReadingTime(body)} mins read
                    </Typography>

                    <div className="flex flex-wrap items-center my-3">
                        {tagList.map((tag, index) => (
                            <div key={index} className="me-2">
                                <span>#</span>
                                <span className=" text-sm font-semibold text-pink-600">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Typography
                            variant={2}
                            className="text-lg font-bold mb-3 text-pink-600"
                        >
                            Read More ...
                        </Typography>
                    </div>

                    <div className=" relative object-cover max-w-[600px] h-[300px] my-3">
                        <img
                            src={coverImage}
                            alt={title}
                            className=" object-cover h-full w-full"
                        />
                    </div>
                </div>

                <div className=" flex items-center justify-center mt-12 text-xl">
                    <div className=" flex items-center me-6">
                        <FaComment className=" " />
                        <Typography variant={2} className="text-base">
                            {comments.length}
                        </Typography>
                    </div>

                    <div className=" flex items-center me-6">
                        <MdFavorite className=" " />
                        <Typography variant={2} className="text-base">
                            {likeCounts?.length}
                        </Typography>
                    </div>

                    <div className=" flex items-center me-6">
                        <MdInsights className=" " />
                        <Typography variant={2} className="text-base">
                            {views}
                        </Typography>
                    </div>

                    <div className=" flex items-center me-6">
                        <FaShare className=" " />
                        <Typography variant={2} className="text-base">
                            {' '}
                            10{' '}
                        </Typography>
                    </div>
                </div>
            </article>
        </div>
    );
};

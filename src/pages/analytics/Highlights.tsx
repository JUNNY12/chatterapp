import React from 'react';
import { Typography } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { MdInsights, MdFavorite } from 'react-icons/md';
import { FaComment } from 'react-icons/fa';
import { Post } from './Analytics';
import { calculateReadingTime } from '../../utils';
import { formatDate } from '../../utils/formatDate';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';
import { AnalyticsLoader } from '../../components/modules/skeletonloader';

interface HighlightsProps {
    highestPost: Post | any;
    postSummaries: any;
}

export const Highlights = ({
    highestPost,
    postSummaries,
}: HighlightsProps): React.JSX.Element => {
    const { theme } = useThemeContext();

    if (!highestPost) {
        return (
            <div>
                <AnalyticsLoader />
            </div>
        );
    }

    console.log(highestPost);

    const {
        data: {
            title,
            subtitle,
            views,
            likeCount,
            comments,
            coverImage,
            tagList,
            body,
            createdAt,
        },
    } = highestPost;

    const {
        month,
        year,
        totalPosts,
        totalViews,
        totalLikes,
        totalComments,
        filteredPosts,
    } = postSummaries;

    console.log(postSummaries);

    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    return (
        <div
            className={`rounded-md m-8 p-8 tabletXS:m-3  mobileXL:px-2 h-full transition duration-500 ease-in-out 
         ${
             theme === 'lightMode'
                 ? 'bg-white-50 text-black-950'
                 : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
        >
            <div className=" border-b-2 pb-3 border-pink-600">
                <Typography variant={1} className={`text-2xl font-bold mb-3`}>
                    Post Analytics
                </Typography>

                <Typography variant={2} className={`text-base font-normal`}>
                    <span> {formatDate(createdAt)}, </span>
                    <span> {getTimeDifferenceString(timeDifference)} </span>
                </Typography>
            </div>

            <div className=" flex items-center">
                <Typography
                    variant={1}
                    className={`text-xl font-bold mb-6 mt-6`}
                >
                    Top Post
                </Typography>

                <Typography variant={2} className={`ms-12 text-lg font-normal`}>
                    earned {views} views
                </Typography>
            </div>

            <div>
                <article className="tabletXS:my-3 mobileXL:px-2 cursor-pointer">
                    <div>
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
                            {tagList.map((tag: string, index: number) => (
                                <div key={index} className="me-2">
                                    <span>#</span>
                                    <span className=" text-sm font-semibold text-pink-600">
                                        {tag}
                                    </span>
                                </div>
                            ))}
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
                                {likeCount}
                            </Typography>
                        </div>

                        <div className=" flex items-center me-6">
                            <MdInsights className=" " />
                            <Typography variant={2} className="text-base">
                                {views}
                            </Typography>
                        </div>
                    </div>
                </article>
            </div>

            <div>
                <div className=" border-b-2 pb-3 border-pink-600">
                    <Typography
                        variant={1}
                        className={`text-2xl mobileXL:text-xl font-bold  mt-6`}
                    >
                        Posts Summary
                    </Typography>
                </div>

                <div>
                    <div className="mt-4">
                        <Typography variant={3} className={`font-normal mb-3`}>
                            <span> {month} </span>
                            <span> {year} </span>
                            <span> Summary </span>
                        </Typography>
                    </div>

                    <div className=" flex items-center justify-between  flex-wrap max-w-[400px]">
                        <Typography
                            variant={2}
                            className={`text-base  font-semibold mb-3`}
                        >
                            <span> {totalPosts} </span>
                            <span>
                                {totalPosts > 1 ? 'Total Posts' : 'Total Post'}
                            </span>
                        </Typography>

                        <Typography
                            variant={2}
                            className={`text-base  font-semibold  mb-3`}
                        >
                            <span> {totalViews} </span>
                            <span>
                                {totalViews > 1 ? 'Impressions' : 'Impression'}{' '}
                            </span>
                        </Typography>
                    </div>
                    <div className=" flex items-center justify-between flex-wrap max-w-[400px]">
                        <Typography
                            variant={2}
                            className={`text-base  font-semibold mb-3`}
                        >
                            <span> {totalLikes} </span>
                            <span>
                                {' '}
                                {totalLikes > 1
                                    ? 'Total Likes'
                                    : 'Total Like'}{' '}
                            </span>
                        </Typography>

                        <Typography
                            variant={2}
                            className={`text-base  font-semibold  mb-3`}
                        >
                            <span> {totalComments} </span>
                            <span>
                                {totalComments > 1
                                    ? 'Total Comments'
                                    : 'Total Comment'}
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
            <div>
                {filteredPosts.length === 0 && (
                    <div className="mt-4">
                        <Typography variant={3} className={`font-normal mb-3`}>
                            <span> No Posts this </span>
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

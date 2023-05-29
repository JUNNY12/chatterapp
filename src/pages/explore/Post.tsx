import React from 'react';
import { Typography } from '../../components/element';
import { FaShare, FaComment } from 'react-icons/fa';
import { MdFavorite, MdInsights } from 'react-icons/md';

interface PostProps {
    id?: any;
    title?: string;
    description?: string;
    datePosted?: string;
}

export const Post = ({
    title,
    description,
    datePosted,
}: PostProps): React.JSX.Element => {
    return (
        <article className="border-b border-gray-300 p-8 mobileXL:px-2 cursor-pointer">
            <div className=" flex items-center mb-3">
                <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 border border-gray-300 relative rounded-full object-cover">
                    <img
                        src="/images/hero.svg"
                        alt="user"
                        className=" rounded-full object-cover w-full h-full"
                    />
                </div>
                <div>
                    <Typography
                        variant={1}
                        className="font-bold text-2xl mobileXL:text-lg"
                    >
                        John Doe
                    </Typography>
                    <Typography
                        variant={2}
                        className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                    >
                        <span> Product Manager </span>
                        <span className=" ms-6 mobileXL:ms-3">
                            {datePosted}
                        </span>
                    </Typography>
                </div>
            </div>

            <div>
                <Typography
                    variant={1}
                    className=" text-3xl mobileXL:text-xl font-bold mb-2"
                >
                    {title}
                </Typography>
                <Typography variant={2} className="font-semibold mb-1">
                    10 mins read
                </Typography>

                <p className=" max-w-[600px]">
                    {description?.substring(0, 100) + ' ... '}
                </p>

                <div>
                    <Typography
                        variant={2}
                        className="text-lg font-bold mb-3 text-pink-600"
                    >
                        Read More ...
                    </Typography>
                </div>

                <div className=" relative object-contain max-w-[600px] h-[250px] my-3">
                    <img
                        src="/images/hero.svg"
                        alt="post"
                        className=" object-contain h-full w-full"
                    />
                </div>

                <div className=" flex items-center justify-center mt-12 text-xl">
                    <div className=" flex items-center me-3">
                        <FaComment className=" " />
                        <Typography variant={2} className="text-base">
                            {' '}
                            10{' '}
                        </Typography>
                    </div>

                    <div className=" flex items-center me-3">
                        <MdFavorite className=" " />
                        <Typography variant={2} className="text-base">
                            {' '}
                            10{' '}
                        </Typography>
                    </div>

                    <div className=" flex items-center me-3">
                        <MdInsights className=" " />
                        <Typography variant={2} className="text-base">
                            {' '}
                            10{' '}
                        </Typography>
                    </div>

                    <div className=" flex items-center me-3">
                        <FaShare className=" " />
                        <Typography variant={2} className="text-base">
                            {' '}
                            10{' '}
                        </Typography>
                    </div>
                </div>
            </div>
        </article>
    );
};
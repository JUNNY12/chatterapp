import React from 'react';
import { Typography, Button } from '../../components/element';
import { Fade } from 'react-awesome-reveal';

export const Hero = (): React.JSX.Element => {
    return (
        <div className="flex justify-between items-center h-max tabletM:flex-col-reverse">
            <div className="w-1/2 tabletM:w-full">
                <Fade direction="left" duration={3000} triggerOnce>
                    <Typography
                        variant={1}
                        className=" text-7xl mb-6 tabletS:text-5xl "
                    >
                        <span className="text-pink-600 animate-pulse">
                            {' '}
                            Unleash{' '}
                        </span>{' '}
                        <span>the Power of Words</span>
                    </Typography>
                </Fade>

                <Fade direction="left" duration={3000} triggerOnce>
                    <p className=" text-lg leading-relaxed ">
                        Share your creativity with the world on our inclusive
                        platform. Post diverse content, connect with like-minded
                        individuals, and inspire others with your unique
                        perspective. Join chatter and unleash your creative
                        potential today!
                    </p>
                </Fade>

                <div className="mt-8">
                    <Fade direction="left" duration={3000} triggerOnce>
                        <Button className="bg-pink-600 w-[200px] text-white-50 rounded-[40px] p-2 font-semibold">
                            Write Now !! Its Free
                        </Button>
                    </Fade>
                </div>
            </div>

            <div className=" relative w-1/2 tabletM:w-full h-[400px] ms-8 rounded-sm cursor-pointer  tabletM:ms-0 tabletXS:h-[250px] tabletM:mb-6">
                <Fade direction="down" duration={3000} triggerOnce>
                    <img
                        src={'/images/write.svg'}
                        alt="hero"
                        className="rounded-sm object-cover w-full h-full hover:transform hover:scale-90 transition duration-500 ease-in-out "
                    />
                </Fade>
            </div>
        </div>
    );
};

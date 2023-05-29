import React from 'react';
import { Typography, Button } from '../../components/element';

export const Hero = (): React.JSX.Element => {
    return (
        <div className="flex justify-between items-center h-max tabletM:flex-col-reverse">
            <div className="w-1/2 tabletM:w-full">
                <Typography
                    variant={1}
                    className=" text-7xl mb-6 tabletS:text-5xl "
                >
                    <span className="text-pink-600 animate-pulse">
                        {' '}
                        Unleash{' '}
                    </span>{' '}
                    Your Inner Tech Enthusiast
                </Typography>

                <p className=" text-lg leading-relaxed ">
                    At Chatter, we believe that everyone has a story to share,
                    and what better way to express yourself than through the
                    captivating world of technology? Whether you're an aspiring
                    tech guru, a passionate hobbyist, or simply someone with an
                    insatiable curiosity, our blog provides the perfect platform
                    for you to write, explore, and connect with like-minded
                    individuals.
                </p>

                <div className="mt-8">
                    <Button className="bg-pink-600 w-[200px] text-white-50 rounded-[40px] p-2 font-semibold">
                        Write Now !! Its Free
                    </Button>
                </div>
            </div>

            <div className=" relative w-1/2 tabletM:w-full h-[400px] tabletXS:h-[300px]">
                <img src={'/images/hero.svg'} alt="hero" />
            </div>
        </div>
    );
};

import { Typography } from '../../components/element';
import { WhyCard } from './WhyCard';
import { TbClover, TbWritingSign } from 'react-icons/tb';
import { GiRingingBell } from 'react-icons/gi';
import { FaBrain } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const whyContent = [
    {
        id: 1,
        icon: <TbClover />,
        title: 'Embrace Your Passion',
        description:
            'Are you fascinated by the latest gadgets, cutting-edge software, or emerging trends in the tech industry? Chatter is the ultimate hub for tech enthusiasts like you.',
    },
    {
        id: 2,
        icon: <GiRingingBell />,
        title: 'Be Heard',
        description:
            "Chatter is more than just a blog; it's a community.Share your unique perspective, insights, and experiences with a global audience of tech- savvy individuals.",
    },
    {
        id: 3,
        icon: <FaBrain />,
        title: 'Expand Your Knowledge',
        description:
            'Stay ahead of the curve and fuel your hunger for knowledge. Chatter offers a vast array of articles, guides, tutorials, and reviews to keep you up to date with the ever-evolving world of technology',
    },
    {
        id: 4,
        icon: <TbWritingSign />,
        title: 'Enhance Your Writing Skills',
        description:
            'Writing about technology not only helps you express your thoughts but also sharpens your communication skills.',
    },
];

export const Why = (): React.JSX.Element => {
    return (
        <div className="mt-20 pb-8">
            <Typography variant={2} className=" text-4xl mb-8 text-center">
                <Fade direction="up" triggerOnce={true} duration={2000}>
                    Why Chatter?
                </Fade>
            </Typography>

            <div className=" flex flex-wrap justify-center items-center">
                {whyContent.map((item) => {
                    const { title, description, icon } = item;
                    return (
                        <WhyCard
                            key={item.id}
                            title={title}
                            description={description}
                            icon={icon}
                        />
                    );
                })}
            </div>
        </div>
    );
};

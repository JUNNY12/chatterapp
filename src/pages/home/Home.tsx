import { Connect, Hero, Why } from '.';
import { Container } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { chatterImgUrl } from '../../config/constants/url';
import { MetaTag } from '../../components/metatag/MetaTag';

export default function Home() {
   const { theme } = useThemeContext();

   return (
      <>
         <MetaTag
            title="Chatter | Home"
            ogTitle="Share your creativity with the world"
            description="Share your creativity with the world on our inclusive platform. Post diverse content, connect with like-minded individuals"
            image={chatterImgUrl}
            url="/"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Share your creativity with the world on our inclusive platform. Post diverse content, connect with like-minded individuals"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/"
         />
         <Container
            className={`transition duration-500 ease-in-out pt-44 tabletM:pt-24
        ${
           theme === 'lightMode'
              ? ' bg-white-50 text-black-950'
              : theme === 'darkMode' && 'bg-gray-800 text-white-100'
        }
        `}
         >
            <Hero />
            <Why />
            <Connect />
         </Container>
      </>
   );
}

import { Connect, Hero, Why } from '.';
import { Container } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Helmet } from 'react-helmet-async';

export default function Home() {
   const { theme } = useThemeContext();

   return (
    <>
         <Helmet>
            <title>Chatter | Home</title>
            <meta name="description" content="Share your creativity with the world on our inclusive platform. Post diverse content, connect with like-minded individuals" />
            <link rel="canonical" href="/" />
         </Helmet>
         <Container
            className={`transition duration-500 ease-in-out pt-44 tabletM:pt-24
        ${theme === 'lightMode'
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

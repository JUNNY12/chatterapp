import { Connect, Hero, Why } from '.';
import { Container } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export default function Home() {
    const { theme } = useThemeContext();
   
;
    return (
        <Container
            className={`transition duration-500 ease-in-out pt-44 tabletM:pt-24
        ${
            theme === 'lightMode'
                ? ' bg-white-50 text-black-950'
                : theme === 'darkMode' && 'bg-gray-800 text-white-100'
        }
        `}
        >
            <div>
                <Hero />
            </div>

            <div>
                <Why />
            </div>

            <div>
                <Connect />
            </div>
        </Container>
    );
}

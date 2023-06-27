import { render } from '@testing-library/react';
import { Button } from '../../components/element';

describe('Button', () => {
   it('renders button with correct props and children', () => {
      const buttonText = 'Click me';
      const { getByRole } = render(
         <Button title="Button Title" role="button" arialabel="Button Label" disabled={false}>
            {buttonText}
         </Button>
      );

      const button = getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(buttonText);
      expect(button).toHaveAttribute('title', 'Button Title');
      expect(button).toHaveAttribute('aria-label', 'Button Label');
      expect(button).not.toBeDisabled();
   });

   it('renders disabled button when disabled prop is true', () => {
      const { getByRole } = render(<Button disabled={true}>Disabled Button</Button>);

      const button = getByRole('button');
      expect(button).toBeDisabled();
   });
});

// import { BrowserRouter as Router } from 'react-router-dom';
// import { render, screen, waitFor } from '@testing-library/react';
// import App from '../../App';
// import 'intersection-observer';
// import { HelmetProvider } from 'react-helmet-async';

// const Providers = ({ children }: any) => {
//     HelmetProvider.canUseDOM = false;

//     beforeAll(() => {
//         class IntersectionObserverMock {
//             observe = jest.fn();
//             unobserve = jest.fn();
//             // You can also provide any other necessary methods or properties here
//         }
//         window.IntersectionObserver = IntersectionObserverMock as any;
//     });
//     return (
//         <HelmetProvider>
//             <Router>{children}</Router>
//         </HelmetProvider>
//     );
// };

// test('renders the app', async () => {
//     render(<App />, { wrapper: Providers });

//     await waitFor(() => {
//         const heroText = screen.getByTestId('hero-text');
//         expect(heroText).toBeInTheDocument();
//     });
// });

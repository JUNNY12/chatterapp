import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import 'intersection-observer';
import { HelmetProvider } from 'react-helmet-async';

const Providers = ({ children }: any) => {
   HelmetProvider.canUseDOM = false;

   beforeAll(() => {
      class IntersectionObserverMock {
         observe = jest.fn();
         unobserve = jest.fn();
         // You can also provide any other necessary methods or properties here
      }
      window.IntersectionObserver = IntersectionObserverMock as any;
   });
   return (
      <HelmetProvider>
         <Router>{children}</Router>
      </HelmetProvider>
   );
};

test('renders the app', async () => {
   render(<App />, { wrapper: Providers });

   await waitFor(() => {
      const heroText = screen.getByTestId('hero-text');
      expect(heroText).toBeInTheDocument();
   });
});

import { Provider } from './providers/Provider';
import { Routes } from './config/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import { Loader } from './components/modules';
import { ScrollToTop } from './components/modules';
import { Analytics } from '@vercel/analytics/react'

function App() {
   return (
      <Suspense fallback={<Loader />}>
         <Provider>
            <Analytics />
            <Routes />
            <ToastContainer />
            <ScrollToTop />
         </Provider>
      </Suspense>
   );
}

export default App;

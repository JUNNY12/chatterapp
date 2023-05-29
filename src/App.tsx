import { Provider } from './providers/Provider';
import { Routes } from './config/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import { Loader } from './components/modules';

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Provider>
                <Routes />
                <ToastContainer />
            </Provider>
        </Suspense>
    );
}

export default App;

import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Router from './route/route'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    useEffect(() => {
        if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
            window.location.href = window.location.href.replace('http:', 'https:');
        }
    }, []);

    return (

        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router />
                    <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </PersistGate>
            </Provider>
        </>
    )
}

export default App

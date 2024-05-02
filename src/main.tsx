import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
    </>,
)

// ReactDOM.createRoot(
//     // <React.StrictMode>
//       <><App /></>,
//     // </React.StrictMode>, 
//     document.getElementById('root')
//   );
import reportWebVitals from './reportWebVitals';

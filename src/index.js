import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // initial styles, reset, etc.
import App from './App';
import { Provider } from './context/MyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

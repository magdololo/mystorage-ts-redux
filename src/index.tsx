import React from 'react';
import {createRoot} from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';

import "firebase/auth";
import "firebase/firestore";
import store from './app/store'
import {Provider} from "react-redux";
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './i18n';

let container = document.getElementById('root')
if(container!) {
    let root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

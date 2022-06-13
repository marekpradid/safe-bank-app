import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

// Store
import {store} from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();

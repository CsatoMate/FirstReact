import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import reducer from './store/reducer';
import './index.css';
import App from './App';


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();






/*
ReactDOM.render(<App />,document.getElementById('root'));
registerServiceWorker();
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>

            <App />

        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

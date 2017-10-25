import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './sass/style.scss';
import { setAuthorized } from './ducks/user';
import Auth from './modules/Auth';
import Router from './Router';
import rootReducer from './reducers';

const dev = process.env.NODE_ENV === 'development';

const createReduxStore = (reducer) => {
    /* eslint-disable */
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    /* eslint-enable */
    const middleware = [];
    dev ? middleware.push(thunk, createLogger()) : middleware.push(thunk);

    const enhancer = composeEnhancers(
        applyMiddleware(...middleware),
    );

    return createStore(reducer, enhancer);
};

const store = createReduxStore(rootReducer);

if (Auth.isUserAuthenticated()) {
    store.dispatch(setAuthorized(true));
}

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, document.getElementById('app'),
);

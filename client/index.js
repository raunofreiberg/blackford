import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './sass/style.scss';
import createReduxStore from './configureStore';
import Router from './Router';
import rootReducer from './reducers';
import Auth from './utils/authentication';

// Create Redux store
const store = createReduxStore(rootReducer);

// Authentication JWT middleware
Auth.ensureAuthenticated(store);

// Init FB login
FB.init({
    appId: '1728869704086428',
    status: false,
    cookie: false,
    xfbml: false,
    version: 'v2.8',
});

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>, document.getElementById('app'),
);

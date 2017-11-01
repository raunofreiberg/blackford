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


ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>, document.getElementById('app'),
);


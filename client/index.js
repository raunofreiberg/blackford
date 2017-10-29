import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { error } from 'react-notification-system-redux';
import jwtDecode from 'jwt-decode';

import './sass/style.scss';
import createReduxStore from './configureStore';
import Router from './Router';
import rootReducer from './reducers';
import { setAuthorized, setUser } from './ducks/user';
import Auth from './utils/Auth';
import getNotificationOptions from './utils/notifications';

const store = createReduxStore(rootReducer);

const ensureAuthenticated = () => {
    if (Auth.isUserAuthenticated()) {
        const token = Auth.getToken();
        try {
            const decoded = jwtDecode(token);
            const user = {
                id: decoded.sub,
                name: decoded.name,
            };

            store.dispatch(setAuthorized(true));
            store.dispatch(setUser(user));
        } catch (err) {
            setTimeout(() => {
                store.dispatch(error(getNotificationOptions(err.message)));
            }, 200);
        }
    }
};

ensureAuthenticated();


ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>, document.getElementById('app'),
);

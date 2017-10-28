import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { error } from 'react-notification-system-redux';
import jwtDecode from 'jwt-decode';

import './sass/style.scss';
import createReduxStore from './configureStore';
import { setAuthorized, setUser } from './ducks/user';
import Auth from './modules/Auth';
import Router from './Router';
import rootReducer from './reducers';
import history from './history';

const store = createReduxStore(rootReducer);

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
        history.push('/login');
        store.dispatch(error());
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, document.getElementById('app'),
);

import { error } from 'react-notification-system-redux';
import jwtDecode from 'jwt-decode';

import history from '../history';
import getNotificationOptions from '../utils/notifications';
import Auth from '../utils/authentication';

const SET_USER = 'SET_USER';
const SET_AUTHORIZED = 'SET_AUTHORIZED';

const initialState = {
    user: {
        id: null,
        username: 'Unknown',
        avatar: null,
    },
    isAuthorized: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.status,
            };
        default:
            return state;
    }
}

export const setUser = user => ({ type: SET_USER, user });
export const setAuthorized = status => ({ type: SET_AUTHORIZED, status });

const handleAuthentication = (path, values) => async (dispatch) => {
    try {
        let res = await fetch(`${process.env.API_HOST}/auth/${path}`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        res = await res.json();

        if (res.token) {
            const decoded = jwtDecode(res.token);

            // set token to localstorage
            Auth.authenticateUser(res.token);

            dispatch(setAuthorized(true));
            dispatch(setUser({
                id: decoded.id,
                username: decoded.username,
            }));
            history.push('/');
        } else {
            dispatch(error(getNotificationOptions(res.message)));
        }
    } catch (err) {
        dispatch(error(getNotificationOptions(err.message)));
    }
};

export const createUser = values => handleAuthentication('register', values);
export const logUserIn = values => handleAuthentication('login', values);

export const logUserOut = () => (dispatch) => {
    try {
        FB.getLoginStatus((res) => {
            if (res.status === 'connected') {
                FB.logout();
            }
        });
        Auth.deauthenticateUser();
        dispatch(setAuthorized(false));
    } catch (err) {
        dispatch(error(getNotificationOptions(err.message)));
    }
};

export const facebookLogin = () => (dispatch) => {
    try {
        FB.login((result) => {
            fetch(`${process.env.API_HOST}/auth/facebook/`, {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                    Authorization: `Bearer ${result.authResponse.accessToken}`,
                }),
                mode: 'cors',
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.token) {
                        const decoded = jwtDecode(res.token);

                        Auth.authenticateUser(res.token);
                        dispatch(setAuthorized(true));
                        dispatch(setUser({
                            id: decoded.id,
                            username: decoded.username,
                            avatar: decoded.avatar,
                        }));
                        history.push('/');
                    } else {
                        dispatch(error(getNotificationOptions(res.message)));
                    }
                });
        });
    } catch (err) {
        dispatch(error(getNotificationOptions(err.message)));
    }
};

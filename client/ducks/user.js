import { error } from 'react-notification-system-redux';
import jwtDecode from 'jwt-decode';
import fbLogin from 'facebook-login';

import history from '../history';
import getNotificationOptions from '../utils/notifications';
import Auth from '../utils/authentication';

const fbApi = fbLogin({ appId: '1728869704086428' });

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
        const { token } = res;

        if (token) {
            const decoded = jwtDecode(token);
            const { id, username } = decoded;

            // set token to localstorage
            Auth.authenticateUser(token);

            dispatch(setAuthorized(true));
            dispatch(setUser({
                id,
                username,
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
        Auth.deauthenticateUser();
        dispatch(setAuthorized(false));
    } catch (err) {
        dispatch(error(getNotificationOptions(err.message)));
    }
};

export const facebookLogin = () => async (dispatch) => {
    try {
        const fbResponse = await fbApi.login();
        let authResponse = await fetch(`${process.env.API_HOST}/auth/facebook/`, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                Authorization: `Bearer ${fbResponse.authResponse.accessToken}`,
            }),
        });
        authResponse = await authResponse.json();
        const { token } = authResponse;

        if (token) {
            const decoded = jwtDecode(token);
            const { username, id, avatar } = decoded;

            // set token to localstorage
            Auth.authenticateUser(token);
            dispatch(setAuthorized(true));
            dispatch(setUser({
                id,
                username,
                avatar,
            }));
            history.push('/');
        }
    } catch (err) {
        dispatch(error(getNotificationOptions('Logging in via Facebook failed')));
    }
};

import { error } from 'react-notification-system-redux';

import history from '../history';
import getNotificationOptions from '../utils/notifications';
import Auth from '../utils/Auth';

const SET_USER = 'SET_USER';
const SET_AUTHORIZED = 'SET_AUTHORIZED';

const initialState = {
    user: {
        id: null,
        name: 'Unknown',
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

export const createUser = values => async (dispatch) => {
    try {
        let res = await fetch(`${process.env.API_HOST}/auth/register`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        res = await res.json();

        if (res.token) {
            Auth.authenticateUser(res.token);
            dispatch(setAuthorized(true));
            dispatch(setUser(res.user));
            history.push('/');
        } else {
            dispatch(error(getNotificationOptions(res.message)));
        }
    } catch (err) {
        dispatch(error(getNotificationOptions(err.message)));
    }
};

export const logUserIn = values => async (dispatch) => {
    try {
        let res = await fetch(`${process.env.API_HOST}/auth/login`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        res = await res.json();

        if (res.token) {
            Auth.authenticateUser(res.token);
            dispatch(setAuthorized(true));
            dispatch(setUser(res.user));
            history.push('/');
        } else {
            dispatch(error(getNotificationOptions(res.message)));
        }
    } catch (err) {
        dispatch(error(getNotificationOptions(err.message)));
    }
};

export const logUserOut = () => (dispatch) => {
    try {
        Auth.deauthenticateUser();
        dispatch(setAuthorized(false));
    } catch (e) {
        console.log(e);
    }
};

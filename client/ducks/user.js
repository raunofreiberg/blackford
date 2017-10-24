import history from '../history';
import Auth from '../modules/Auth';

const SET_USER = 'SET_USER';
const SET_AUTHORIZED = 'SET_AUTHORIZED';

const initialState = {
    user: {},
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

const setUser = user => ({ type: SET_USER, user });
const setAuthorized = status => ({ type: SET_AUTHORIZED, status });

export const createUser = values => async (dispatch) => {
    try {
        let res = await fetch(`${process.env.API_HOST}/auth/register`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        res = await res.json();
        await localStorage.setItem('token', res.token);
        await dispatch(setAuthorized(true));
    } catch (e) {
        console.log(e);
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
            localStorage.setItem('token', res.token);
            dispatch(setAuthorized(true));
            history.push('/todos');
        }
    } catch (e) {
        console.log(e);
    }
};

export const logUserOut = () => async (dispatch) => {
    try {
        Auth.deauthenticateUser();
        dispatch(setAuthorized(false));
    } catch (e) {
        console.log(e);
    }
};

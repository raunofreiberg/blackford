const SET_USER = 'SET_USER';

const initialState = {
    user: {},
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}

const setUser = user => ({ type: SET_USER, user });

export const createUser = values => async (dispatch) => {
    try {
        let user = await fetch(`${process.env.API_HOST}/auth/register`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        user = await user.json();
        await dispatch(setUser(user.user[0]));
    } catch (e) {
        console.log(e);
    }
};

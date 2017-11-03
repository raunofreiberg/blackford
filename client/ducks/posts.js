import history from '../history';
import Auth from '../utils/authentication';

const FETCH_POST = 'FETCH_POST';
const SET_POSTS = 'SET_POSTS';
const SET_LOADING = 'SET_LOADING';

const initialState = {
    posts: [],
    post: {
        id: null,
    },
    isLoading: false,
};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
            };
        case FETCH_POST:
            return {
                ...state,
                todo: action.post,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.status,
            };
        default:
            return state;
    }
}

const setPosts = posts => ({ type: SET_POSTS, posts });
export const setLoading = status => ({ type: SET_LOADING, status });
const setFetchedPost = post => ({ type: FETCH_POST, post });

export const createPost = values => async () => {
    try {
        await fetch(`${process.env.API_HOST}/api/posts`, {
            method: 'POST',
            headers: new Headers({
                Authorization: `Bearer ${Auth.getToken()}`,
            }),
            mode: 'cors',
            body: values,
        });
        history.push('/');
    } catch (e) {
        console.log(e);
    }
};

export const deletePost = postId => async (dispatch) => {
    try {
        let res = await fetch(`${process.env.API_HOST}/api/posts/${postId}`, {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            }),
            mode: 'cors',
        });
        res = await res.json();
        await dispatch(setPosts(res.posts));
    } catch (e) {
        console.log(e);
    }
};

export const editPost = (postId, value) => async () => {
    try {
        await fetch(`${process.env.API_HOST}/api/posts/${postId}`, {
            method: 'PUT',
            headers: new Headers({
                'content-type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            }),
            mode: 'cors',
            body: JSON.stringify(value),
        });
    } catch (e) {
        console.log(e);
    }
};

export const fetchPost = id => (dispatch) => {
    try {
        fetch(`${process.env.API_HOST}/api/posts/${id}`, {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json ',
                Authorization: `Bearer ${Auth.getToken()}`,
            }),
            mode: 'cors',
        })
            .then(res => res.json())
            .then(data => dispatch(setFetchedPost(data.post)));
    } catch (e) {
        console.log(e);
    }
};

export const fetchPosts = () => (dispatch) => {
    dispatch(setLoading(true));
    try {
        fetch(`${process.env.API_HOST}/api/posts/`, {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json ',
                Authorization: `Bearer ${Auth.getToken()}`,
            }),
            mode: 'cors',
        })
            .then(res => res.json())
            .then(data => dispatch(setPosts(data.posts)));

        // Done
        dispatch(setLoading(false));
    } catch (e) {
        dispatch(setLoading(false));
        console.log(e);
    }
};

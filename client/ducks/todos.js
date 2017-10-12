const FETCH_TODO = 'FETCH_TODO';
const FETCH_TODOS = 'FETCH_TODOS';
const CREATE_TODO = 'CREATE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';

const initialState = {
    todos: [],
    todo: {
        id: null,
        content: '',
    },
};

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state,
                todos: action.todos,
            };
        case FETCH_TODO:
            return {
                ...state,
                todo: action.todo,
            };
        default:
            return state;
    }
};

const setTodos = todos => ({ type: FETCH_TODOS, todos });
const setFetchedTodo = todo => ({ type: FETCH_TODO, todo });

export const createTodo = (values, callback) => {
    try {
        fetch(`${process.env.API_HOST}/api/todos`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(callback());
    } catch (e) {
        console.log(e);
    }
};

export function deleteTodo(id, callback) {
    try {
        fetch(`${process.env.API_HOST}/api/todos/${id}`, {
            method: 'DELETE',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
        })
            .then(res => res.json())
            .then(callback());
    } catch (e) {
        console.log(e);
    }
}

export function editTodo(id, values, callback) {
    const request = axios.put(`${process.env.API_HOST}/api/todos/${id}`, values)
        .then(() => {
            callback();
        });

    return { type: EDIT_TODO, payload: request };
};

export const fetchTodo = (id, callback) => (dispatch) => {
    try {
        fetch(`${process.env.API_HOST}/api/todos/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setFetchedTodo(data.todo)));
    } catch (e) {
        console.log(e);
    }
};

export const fetchTodos = () => (dispatch) => {
    try {
        fetch(`${process.env.API_HOST}/api/todos`)
            .then(res => res.json())
            .then(data => dispatch(setTodos(data.todos)));
    } catch (e) {
        console.log(e)
    }
};

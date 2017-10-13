const FETCH_TODO = 'FETCH_TODO';
const FETCH_TODOS = 'FETCH_TODOS';
const CREATE_TODO = 'CREATE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_TODOS = 'DELETE_TODOS';
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
        case DELETE_TODOS:
            return {
                ...state,
                todos: action.todos,
            };
        default:
            return state;
    }
};

const setTodos = todos => ({ type: FETCH_TODOS, todos });
const setFetchedTodo = todo => ({ type: FETCH_TODO, todo });
const setDeletedTodos = todos => ({ type: DELETE_TODOS, todos });

export const createTodo = (values, callback) => async () => {
    try {
        await fetch(`${process.env.API_HOST}/api/todos`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        await callback();
    } catch (e) {
        console.log(e);
    }
};

export const deleteTodo = (id, callback) => async () => {
    try {
        await fetch(`${process.env.API_HOST}/api/todos/${id}`, {
            method: 'DELETE',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
        });
        await callback();
    } catch (e) {
        console.log(e);
    }
};

export const deleteAllTodos = () => (dispatch) => {
    try {
        fetch(`${process.env.API_HOST}/api/todos/`, {
            method: 'DELETE',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
        })
            .then(res => res.json())
            .then(todos => dispatch(setDeletedTodos(todos)));
    } catch (e) {
        console.log(e);
    }
};

export const editTodo = (id, values, callback) => async () => {
    try {
        await fetch(`${process.env.API_HOST}/api/todos/${id}`, {
            method: 'PUT',
            headers: new Headers({ 'content-type': 'application/json ' }),
            mode: 'cors',
            body: JSON.stringify(values),
        });
        await callback();
    }
    catch (e) {
        console.log(e);
    }
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
        console.log(e);
    }
};

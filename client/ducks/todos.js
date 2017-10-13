const FETCH_TODO = 'FETCH_TODO';
const SET_TODOS = 'SET_TODOS';

const initialState = {
    todos: [],
    todo: {
        id: null,
        content: '',
    },
};

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            console.log('#####', action)
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
}

const setTodos = todos => ({ type: SET_TODOS, todos });
const setFetchedTodo = todo => ({ type: FETCH_TODO, todo });

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

export const deleteTodo = id => async (dispatch) => {
    try {
        let res = await fetch(`${process.env.API_HOST}/api/todos/${id}`, {
            method: 'DELETE',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
        });
        res = await res.json();
        await dispatch(setTodos(res.todos));
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
            .then(todos => dispatch(setTodos(todos)));
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

export const fetchTodo = id => (dispatch) => {
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

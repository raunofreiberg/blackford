import { combineReducers } from 'redux';
import todoReducer from './ducks/todos';
import user from './ducks/user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    todos: todoReducer,
    form: formReducer,
    user,
});

export default rootReducer;

import {combineReducers} from 'redux';
import todoReducer from './ducks/todos';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    todos: todoReducer,
    form: formReducer,
});

export default rootReducer;

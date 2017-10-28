import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';

import todoReducer from './ducks/todos';
import user from './ducks/user';

const rootReducer = combineReducers({
    todos: todoReducer,
    form: formReducer,
    user,
    notifications,
});

export default rootReducer;

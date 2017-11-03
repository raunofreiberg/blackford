import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';

import postsReducer from './ducks/posts';
import user from './ducks/user';

const rootReducer = combineReducers({
    posts: postsReducer,
    form: formReducer,
    user,
    notifications,
});

export default rootReducer;

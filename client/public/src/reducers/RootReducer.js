import { combineReducers } from 'redux';
import userReducer from './UsersReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer // <-- redux-form
});

export default rootReducer;

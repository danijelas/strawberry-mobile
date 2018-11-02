import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
// import listReducer from './listReducer';

export default combineReducers({
  auth: usersReducer,
  form: formReducer,
  // listsData: listReducer

});

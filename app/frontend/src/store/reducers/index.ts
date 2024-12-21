import { combineReducers } from 'redux';
import menu from './menu';
import auth from './auth';

const rootReducer = combineReducers({
  menu,
  auth,
});

export default rootReducer;

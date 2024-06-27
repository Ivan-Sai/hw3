import { combineReducers } from 'redux';

import user from './user';
import books from './book'
import auth from './profile'

export default combineReducers({
  user,
  books,
  auth
});

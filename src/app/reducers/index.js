import { combineReducers } from 'redux';

import user from './user';
import books from './book'

export default combineReducers({
  user,
  books,
});

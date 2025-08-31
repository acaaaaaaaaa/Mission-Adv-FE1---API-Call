import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
  users: userReducer
});

export default rootReducer;

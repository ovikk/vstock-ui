import { combineReducers } from 'redux';
import app from 'scenes/appReducer';
import auth from 'scenes/Login/authReducer';

export default combineReducers({
  auth,
});

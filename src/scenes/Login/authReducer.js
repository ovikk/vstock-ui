import authActions from './authActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  loginError: '',
};

export default handleActions(
  {
    [authActions.setLogInError]: (state, action) => {
      return { ...state, loginError: action.payload };
    },
  },
  defaultState
);

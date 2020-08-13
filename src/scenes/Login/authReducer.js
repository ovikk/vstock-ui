import authActions from './authActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  loginError: '',
  isAuthenticated: false,
  isLoading: true,
  loginData: {}
};

export default handleActions(
  {
    [authActions.setLogInError]: (state, action) => {
      return { ...state, loginError: action.payload };
    },
    [authActions.setUser]: (state, action) => {
      return { ...state, loginData: action.payload, isAuthenticated: true };
    },
    [authActions.logout]: (state, action) => {
      return { ...state, isAuthenticated: false };
    },
    [authActions.setIsLoading]: (state, action) => {
      return {...state, isLoading: action.payload}
    }
  },
  defaultState
);

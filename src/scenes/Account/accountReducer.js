import { handleActions } from 'redux-actions';
import accountActions from './accountActions';

const defaultState = {
  userData: undefined,
};

export default handleActions(
  {
    [accountActions.setUserData]: (state, action) => {
      return { ...state, userData: action.payload };
    },
  },
  defaultState
);

import statsActions from './statsActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  stats: undefined,
};

export default handleActions(
  {
    [statsActions.setStats]: (state, action) => {
      return { ...state, stats: action.payload };
    },
  },
  defaultState
);

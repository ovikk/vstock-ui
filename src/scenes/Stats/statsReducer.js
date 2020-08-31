import statsActions from './statsActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  stats: undefined,
  statsAll: undefined,
  statsYear: undefined,
  statsMonth: undefined,
  statsWeek: undefined,
};

export default handleActions(
  {
    [statsActions.setStats]: (state, action) => {
      return { ...state, stats: action.payload };
    },
    [statsActions.setStatsAll]: (state, action) => {
      return { ...state, statsAll: action.payload };
    },
    [statsActions.setStatsYear]: (state, action) => {
      return { ...state, statsYear: action.payload };
    },
    [statsActions.setStatsMonth]: (state, action) => {
      return { ...state, statsMonth: action.payload };
    },
        [statsActions.setStatsWeek]: (state, action) => {
      return { ...state, statsWeek: action.payload };
    },

  },
  defaultState
);

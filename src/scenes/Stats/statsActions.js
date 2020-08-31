import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setStatsAll: createAction('SET_STATS_ALL'),
  setStatsYear: createAction('SET_STATS_YEAR'),
  setStatsMonth: createAction('SET_STATS_MONTH'),
  setStatsWeek: createAction('SET_STATS_DAY'),
};

export function getStatsAll() {
  return async (dispatch) => {
    const response = await Api.getStatsAll();
    console.log(response);
    if (!response.error) {
      dispatch(actions.setStatsAll(response.data));
    }
  };
}

export function getStatsYear() {
  return async (dispatch) => {
    const response = await Api.getStatsYear();
    console.log(response);
    if (!response.error) {
      dispatch(actions.setStatsYear(response.data));
    }
  };
}
export function getStatsMonth() {
  return async (dispatch) => {
    const response = await Api.getStatsMonth();
    console.log(response);
    if (!response.error) {
      dispatch(actions.setStatsMonth(response.data));
    }
  };
}
export function getStatsWeek() {
  return async (dispatch) => {
    const response = await Api.getStatsWeek();
    console.log(response);
    if (!response.error) {
      dispatch(actions.setStatsWeek(response.data));
    }
  };
}

export default actions;

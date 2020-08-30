import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setStats: createAction('SET_STATS'),
};

export function getStats() {
  return async (dispatch) => {
    const response = await Api.getStats();
    console.log(response)
    if (!response.error) {
      dispatch(actions.setStats(response.data));
    }
  };
}

export default actions;

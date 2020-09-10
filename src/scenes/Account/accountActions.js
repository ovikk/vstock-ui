import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setUserData: createAction('SET_USER_DATA'),
};

export function fetchUserData() {
  return async (dispatch) => {
    const response = await Api.getUserData();


    if (!response.error) {
      dispatch(actions.setUserData(response.data));
    } else {
      dispatch(actions.setUserData({}));
    }
  };
}

export default actions;

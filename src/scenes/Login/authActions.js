import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setUser: createAction('SET_USER'),
  logout: createAction('LOGOUT'),
  setLogInError: createAction('SET_LOG_IN_ACTION'),
};

export function login(email, password) {
  return async (dispatch) => {
    const response = await Api.login(email, password);
    console.log(response);

    if (response.error) {
      dispatch(actions.setLogInError(response.error.message));
    } else {
    }
  };
}

export default actions;

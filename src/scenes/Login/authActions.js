import { createAction } from 'redux-actions';
import inventoryActions from 'scenes/Inventory/inventoryActions';
import Api from 'Api';

const actions = {
  setUser: createAction('SET_USER'),
  logout: createAction('LOGOUT'),
  setLogInError: createAction('SET_LOG_IN_ACTION'),
  setIsLoading: createAction('SET_IS_LOADING'),
};

export function auth() {
  return async (dispatch) => {
    dispatch(actions.setIsLoading(true));
    const response = await Api.auth();

    if (!response.error && !!response.data.is_logged_in) {
      dispatch(inventoryActions.setOwnInventoryId(response.data.inventory_id));
      dispatch(actions.setUser(response));
    }
    dispatch(actions.setIsLoading(false));
  };
}

export function login(email, password) {
  return async (dispatch) => {
    dispatch(actions.setIsLoading(true));
    const response = await Api.login(email, password);

    if (response.error) {
      dispatch(actions.setLogInError(response.error.message));
    } else {
      dispatch(inventoryActions.setOwnInventoryId(response.data.inventory_id));
      dispatch(actions.setUser(response));
    }

    dispatch(actions.setIsLoading(false));
  };
}

export function registrate(email, password) {
  return async (dispatch) => {
    dispatch(actions.setIsLoading(true));
    const response = await Api.registrate(email, password);

    if (response.error) {
      dispatch(actions.setLogInError(response.error.message));
    } else {
      console.log('REGISTRATE', { response });
      dispatch(inventoryActions.setOwnInventoryId(response.data.inventory_id));
      dispatch(actions.setUser(response));
    }
    dispatch(actions.setIsLoading(false));
  };
}

export function logout() {
  return async (dispatch) => {
    const response = await Api.logout();

    if (response.error) {
      console.log('were fucked');
    } else {
      dispatch(actions.logout());
    }
  };
}

export default actions;

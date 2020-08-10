import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setOwnInventoryId: createAction("SET_OWN_INVENTORY_ID")
};

export function login(email, password) {
  return async (dispatch) => {
    const response = await Api.login(email, password)
  };
}

export default actions;

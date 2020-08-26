import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setItemList: createAction('SET_INVENTORY_ITEM_LIST'),
  setSoldItemList: createAction('SET_SOLD_ITEM_LIST'),
  setOwnInventoryId: createAction('SET_OWN_INVENTORY_ID'),
};

export function fetchOwnInventoryItems() {
  return async (dispatch) => {
    const response = await Api.getOwnInventory();

    if (!response.error) {
      dispatch(actions.setItemList(response.data.items));
    } else {
      dispatch(actions.setItemList([]));
    }
  };
}

export function fetchOwnSoldInventoryItems() {
  return async (dispatch) => {
    const response = await Api.getOwnSoldInventory();
    if (!response.error) {
      dispatch(actions.setSoldItemList(response.data));
    } else {
      dispatch(actions.setSoldItemList([]));
    }
  };
}

export default actions;

import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setOwnDealersList: createAction('SET_OWN_DEALERS_LIST'),
  setOwnBuyersList: createAction('SET_OWN_BUYERS_LIST'),
  setDealersInventory: createAction('SET_DEALERS_INVENTORY')
};

export function fetchDealersInventory() {
  return async(dispatch) => {
    const response = await Api.getDealersInventory();
    
    console.log(response)
    if (!response.error) {
      dispatch(actions.setDealersInventory(response.data));
    } else {
      dispatch(actions.setDealersInventory([]));
    }
  }
}

export function fetchOwnDealers() {
  return async (dispatch) => {
    const response = await Api.getOwnDealers();

    if (!response.error) {
      dispatch(actions.setOwnDealersList(response.data));
    } else {
      dispatch(actions.setOwnDealersList([]));
    }
  };
}

export function fetchOwnBuyers() {
  return async (dispatch) => {
    const response = await Api.getOwnBuyers();

    if (!response.error) {
      dispatch(actions.setOwnBuyersList(response.data));
    } else {
      dispatch(actions.setOwnBuyersList([]));
    }
  };
}

export default actions;

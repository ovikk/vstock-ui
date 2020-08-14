import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setIsFetching: createAction('SET_IS_FETCHING_ITEMS'),
  setItemList: createAction('SET_INVENTORY_ITEM_LIST'),
  setOwnInventoryId: createAction('SET_OWN_INVENTORY_ID'),
};

export function fetchOwnInventoryItems() {
    return async (dispatch) => {
        const response = await Api.getOwnInventory()

        if (!response.error) {
            dispatch(actions.setItemList(response.data.items))
        } else {
            dispatch(actions.setItemList([]))
        }

        dispatch(actions.setIsFetching(false))
    }
}

export default actions;

import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setIsFetching: createAction('SET_IS_FETCHING_ITEMS'),
  setItemList: createAction('SET_INVENTORY_ITEM_LIST'),
};

export function fetchOwnInventoryItems() {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
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

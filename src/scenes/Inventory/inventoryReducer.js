import inventoryActions from './inventoryActions';
import authActions from 'scenes/Login/authActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  items: undefined,
  isFetchingItems: false,
  ownInventoryId: 0,
};

export default handleActions(
  {
    [inventoryActions.setIsFetching]: (state, action) => {
      return { ...state, isFetchingItems: action.payload };
    },
    [inventoryActions.setItemList]: (state, action) => {
      return { ...state, items: action.payload };
    },
    [inventoryActions.setOwnInventoryId]: (state, action) => {
      return { ...state, ownInventoryId: action.payload };
    },
    [authActions.logout]: (state, action) => {
      return { ...state, ...defaultState };
    },
  },
  defaultState
);

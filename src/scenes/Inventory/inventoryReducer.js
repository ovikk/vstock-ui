import inventoryActions, { auth } from './inventoryActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  items: undefined,
  isFetchingItems: false,
};

export default handleActions(
  {
    [inventoryActions.setIsFetching]: (state, action) => {
      return { ...state, isFetchingItems: action.payload };
    },
    [inventoryActions.setItemList]: (state, action) => {
        return { ...state, items: action.payload };
      },
  },
  defaultState
);

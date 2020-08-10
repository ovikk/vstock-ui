import { handleActions } from 'redux-actions';
import appActions from './appActions';

const defaultState = {
  ownInventoryId: 0,
};

export default handleActions(
  {
    [appActions.setOwnInventoryId]: (state, action) => {
      return { ...state, ownInventoryId: action.payload };
    },
  },
  defaultState
);

import dealersActions from './dealersActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  dealersList: undefined,
  buyersList: undefined,
  dealersItems: undefined
};

export default handleActions(
  {
    [dealersActions.setOwnDealersList]: (state, action) => {
      return { ...state, dealersList: action.payload };
    },

    [dealersActions.setOwnBuyersList]: (state, action) => {
      return { ...state, buyersList: action.payload };
    },

    [dealersActions.setDealersInventory]: (state, action) => {
      return { ...state, dealersItems: action.payload };
    },

  },
  defaultState
);

import dealersActions from './dealersActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  dealersList: undefined,
};

export default handleActions(
  {
    [dealersActions.setOwnDealersList]: (state, action) => {
      return { ...state, dealersList: action.payload };
    },
  },
  defaultState
);

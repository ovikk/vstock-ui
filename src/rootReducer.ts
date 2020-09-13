import { combineReducers } from 'redux';
import auth from 'scenes/Login/authReducer';
import inventory from 'scenes/Inventory/inventoryReducer';
import dealers from 'scenes/Dealers/dealersReducer';
import snackbar from 'components/Snackbar/snackbarReducer';
import stats from 'scenes/Stats/statsReducer';
import account from 'scenes/Account/accountReducer';

export default combineReducers({
  auth,
  account,
  inventory,
  dealers,
  snackbar,
  stats,
});

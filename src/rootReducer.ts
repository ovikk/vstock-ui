import { combineReducers } from 'redux';
import auth from 'scenes/Login/authReducer';
import inventory from 'scenes/Inventory/inventoryReducer';
import dealers from 'scenes/Dealers/dealersReducer';
import snackbar from 'components/Snackbar/snackbarReducer';

export default combineReducers({
  auth,
  inventory,
  dealers,
  snackbar,
});

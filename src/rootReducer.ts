import { combineReducers } from 'redux';
import auth from 'scenes/Login/authReducer';
import inventory from 'scenes/Inventory/inventoryReducer'
import dealers from 'scenes/Dealers/dealersReducer'

export default combineReducers({
  auth,
  inventory,
  dealers
});

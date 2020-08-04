import { combineReducers } from 'redux';
import auth from 'scenes/Login/authReducer';
import inventory from 'scenes/Inventory/inventoryReducer'

export default combineReducers({
  auth,
  inventory
});

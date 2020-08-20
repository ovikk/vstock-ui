import { createAction } from 'redux-actions';
import inventoryActions from 'scenes/Inventory/inventoryActions';
import Api from 'Api';

const actions = {
  setShowSnackbar: createAction('SET_SHOW_SNACKBAR'),
  setSnackbarText: createAction('SET_SNACKBAR_TEXT'),
};

export function showSnackbar(text) {
  return async (dispatch) => {
    dispatch(actions.setShowSnackbar(true));
    dispatch(actions.setSnackbarText(text));
    setTimeout(() => dispatch(actions.setShowSnackbar(false)), 2000);
  };
}

export function hideSnackbar() {
  return async (dispatch) => {
    dispatch(actions.setShowSnackbar(false));
  };
}

export default actions;

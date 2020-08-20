import snackbarActions from './snackbarActions';
import { handleActions } from 'redux-actions';

const defaultState = {
  showSnackbar: false,
  snackbarText: '',
};

export default handleActions(
  {
    [snackbarActions.setShowSnackbar]: (state, action) => {
      return { ...state, showSnackbar: action.payload };
    },
    [snackbarActions.setSnackbarText]: (state, action) => {
      return { ...state, snackbarText: action.payload };
    },
  },
  defaultState
);

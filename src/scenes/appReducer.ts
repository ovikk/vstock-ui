import { handleActions } from 'redux-actions';

interface appStateType {
    
}

const defaultState = {
//   initialized: false,
//   updateView: false,
//   state: appStates.active,
//   tintColor: brandColors[0],
//   orientation: orientations.portrait,
//   developerModeEnabled: false,
//   ratingActionAt: undefined,
//   refreshing: false,
//   videoQuality: undefined,
};

export default handleActions(
  {
    // [appActions.setInitialized]: (state) => {
    //   return { ...state, initialized: true };
    // },
  },
  defaultState
);

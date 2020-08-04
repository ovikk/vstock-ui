import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setUser: createAction('SET_USER'),
  logout: createAction('LOGOUT'),
};

export function login(email: string, password: string) {
  return async (dispatch: unknown) => {
    const response = await Api.login(email, password)
  };
}

// export function finalizeAuth(loginType) {
//   return async dispatch => {
//     await dispatch(actions.setIsFacebookLoginActive(false))
//     switch (loginType) {
//       case loginTypes.email:
//         dispatch(sendEmailAuthFinished())
//         break
//       case loginTypes.facebook:
//         dispatch(sendFacebookAuthFinished())
//         break
//       case loginTypes.google:
//         dispatch(sendGoogleAuthFinished())
//         break
//     }
//   }
// }

// export function login(accessToken, loginType, user) {
//   return async dispatch => {
//     await dispatch(updateUserData(accessToken, user))
//     await dispatch(refreshVideoData())
//     await dispatch(loadFavorites())
//     await dispatch(loadDislikedVideoIds())
//     await dispatch(finalizeAuth(loginType))
//   }
// }

export default actions;

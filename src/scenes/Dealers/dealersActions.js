import { createAction } from 'redux-actions';
import Api from 'Api';

const actions = {
  setOwnDealersList: createAction('SET_OWN_DEALERS_LIST'),
};

export function fetchOwnDealers() {
    return async (dispatch) => {
        const response = await Api.getOwnDealers()

        if (!response.error) {
            console.log(response)
            dispatch(actions.setOwnDealersList(response.data))
        } else {
            dispatch(actions.setOwnDealersList([]))
        }
    }
}

export default actions;

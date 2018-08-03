import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    tokenId: null,
    loading: false,
    error: null
}

const authStart = (state, action) => {
    console.log('LOADING!');
    return updateObject(state, { loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        tokenId: action.tokenId,
        loading: false,
        error: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START): return authStart(state, action);
        case (actionTypes.AUTH_FAIL): return authFail(state, action);
        case (actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
        default: return state;
    }
}

export default reducer;
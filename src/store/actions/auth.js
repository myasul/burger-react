import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        tokenId: authData.idToken
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expirationTime * 1000);
    };
};

export const authInit = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const authEndpoint = isSignup ? 'signupNewUser' : 'verifyPassword';
        const API_KEY = 'AIzaSyBrgLjCLgYqDVlQhGERuwfaE5kfS-F7Fd8';

        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authEndpoint}?key=${API_KEY}`, credentials)
            .then(response => {
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message));
            });
    };
};
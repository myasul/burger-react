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

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const logout = () => {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');

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
                const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));

                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('tokenId', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message));
            });
    };
};

export const checkLoginValidity = () => {
    return dispatch => {
        const tokenId = localStorage.getItem('tokenId');
        if (!tokenId) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate >= new Date()) {
                const userId = localStorage.getItem('userId');
                const updatedExpirationDate = new Date(
                    new Date().getTime() + (expirationDate.getTime() - new Date().getTime())
                );
                localStorage.setItem('expirationDate', updatedExpirationDate);
                dispatch(authSuccess({ idToken: tokenId, localId: userId }));
            } else {
                dispatch(logout());
            }
        }
    }
}
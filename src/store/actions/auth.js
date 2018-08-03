import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authInit = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        console.log(credentials);
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBrgLjCLgYqDVlQhGERuwfaE5kfS-F7Fd8', credentials)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
}

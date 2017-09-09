import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password}) => {
    return (dispatch) => {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
            // If the request is good...
            // - Update state to indicate user is authenticated
            dispatch({ type: AUTH_USER });
            // - Save the JWT token
            localStorage.setItem('token', response.data.token);
            // - Redirect to the route '/feature'
            browserHistory.push('/#feature');
        })
        .catch(() => {
            // If the request is bad...
            // - Show an error to the user
            dispatch(authError('Bad Login Info'));        
        }); 
    }
}

export const signupUser = ({ email, password}) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/#feature');
        })
        .catch((response) => {
            console.log(response);
            dispatch(authError(response.data.error));        
        }); 
    }
}

export const signoutUser = () => {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const fetchMessage = () => {
    return (dispatch) => {
        axios.get(ROOT_URL, {
            headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({ 
                    type: AUTH_USER, 
                    payload: response.data.message 
                });
        })
    }
}

/*
export const fetch_Message = () => {
    const request = axios.get(ROOT_URL, {
        headers: { token: localStorage.getItem('token') }
    })

    return { 
        type: AUTH_USER, 
        payload: request 
    }
}
*/
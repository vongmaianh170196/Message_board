import { USER_LOADED, LOGIN_USER, REGISTER_USER, LOGOUT_USER, USER_ERROR } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_USER:
        case REGISTER_USER:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case LOGOUT_USER:
        case USER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                token: null
            }
        default: 
            return state
    }
}
import { USER_LOADED, USER_ERROR, REGISTER_USER, LOGIN_USER, LOGOUT_USER } from './types';
import {setAlert} from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loaduser =  () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)       
    }
    try {
        const res = await axios.get('/api/user/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: USER_ERROR
        })
    }
}

export const register = ({username, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post('/api/user/register', body, config);
        dispatch({
            type:REGISTER_USER,
            payload: res.data
        });
        dispatch(loaduser());

    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:USER_ERROR
        })
    }
}
export const login = ({username, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post('/api/user/login', body, config);
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        });
        dispatch(loaduser());

    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:USER_ERROR
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    })
}
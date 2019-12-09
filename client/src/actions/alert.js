import { ALERT_MESSAGE, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (message, style, timeout=3000) => dispatch => {
    const id = uuid();
    dispatch({
        type: ALERT_MESSAGE,
        payload: {message, style, id}
    });

    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout)
}
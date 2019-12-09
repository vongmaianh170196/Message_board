import {REMOVE_ALERT, ALERT_MESSAGE} from '../actions/types';
const initialState = [];

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case ALERT_MESSAGE:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state; 
    }
};
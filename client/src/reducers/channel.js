import { GET_CHANNELS, CHANNEL_ERROR, GET_CHANNEL } from '../actions/types';

const initialState = {
    channels: [],
    channel: {},
    loading: true,
    error: null
}
export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CHANNELS:
            return {
                ...state,
                channels: payload,
                loading: false
            }
        case GET_CHANNEL:
            return {
                ...state,
                channel: payload,
                loading: false
            }
        case CHANNEL_ERROR:
            return {
                ...state,
                loading: true,
                error: payload
            }
        default:
            return state
    }
}
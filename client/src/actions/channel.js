import {
    GET_CHANNELS, CHANNEL_ERROR, GET_CHANNEL
} from './types';

import axios from 'axios';

export const getChannels = () => async dispatch => {
    try {
        const res = await axios.get('/api/channels');
        dispatch({
            type: GET_CHANNELS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHANNEL_ERROR,
            payload: error
        })
    }
}

export const getChannelByName = (name) => async dispatch => {
    try {
        const res = await axios.get('/api/channels');
        const channels = res.data;
        for(let i=0; i< channels.length; i++){
            if(channels[i].title.toLowerCase() === name.toLowerCase()){
                dispatch({
                    type: GET_CHANNEL,
                    payload: channels[i]
                })
            }
        }

    } catch (error) {
        dispatch({
            type: CHANNEL_ERROR,
            payload: error
        })
    }
}
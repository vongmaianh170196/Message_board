import { GET_MESSAGES, MESSAGE_ERROR, POST_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE, POST_REPLY, DELETE_REPLY } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getMessagesByChannel = (id) => async dispatch => {
    try {
        
        const res = await axios.get(`/api/messages/${id}`);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
        // const res = await axios.get('/api/channels');
        // const channels = res.data;
        // const channel_id = 0;
        // for(let i=0; i< channels.length; i++){
        //     if(channels[i].title.toLowerCase() == channel.toLowerCase()){
        //         channel_id = channels[i]._id;
        //     }
        // }
        

    } catch (error) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    }
}

//Post message
export const postMessage = ({title, desc}, channel_id) => async dispatch => {
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({title, desc});

    try {
        const res = await axios.post(`/api/messages/${channel_id}`, body, config);
        dispatch({
            type: POST_MESSAGE,
            payload: res.data
        })
        dispatch(setAlert('Message is created', 'success'))
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    }
}

//Update message
export const updateMessage = ({title, desc}, message_id) => async dispatch => {
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({title, desc});

    try {
        const res = await axios.put(`/api/messages/${message_id}`, body, config);
        dispatch({
            type: EDIT_MESSAGE,
            payload: res.data
        })
        dispatch(setAlert('Message is editted', 'success'))
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    }
}

//DELETE_MESSAGE
export const deleteMessage = (message_id) => async dispatch => {
    
    try {
        await axios.delete(`/api/messages/${message_id}`);
        dispatch({
            type: DELETE_MESSAGE,
            payload: message_id
        })
        dispatch(setAlert('Message is deleted', 'success'))
    } catch (error) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    }
}

//Post reply
export const addReply = (text, message_id) => async dispatch => {
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/messages/replies/${message_id}`, text, config);
        dispatch({
            type: POST_REPLY,
            payload: res.data
        });
        dispatch(setAlert('Reply is created', 'success'))
    } catch (error) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    }

} 

//Delete reply
export const deleteReply = (message_id, reply_id) => async dispatch => {
    
    try {
        await axios.delete(`/api/messages/replies/${message_id}/${reply_id}`);
        dispatch({
            type: DELETE_REPLY,
            payload: reply_id
        });
        dispatch(setAlert('Reply is deleted', 'success'))
    } catch (error) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    }

} 
import { GET_MESSAGES, POST_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE, POST_REPLY, DELETE_REPLY, MESSAGE_ERROR, GET_MESSAGE, GET_ALLMESSAGES } from '../actions/types';

const initialState = {
    messages: [],
    message: {},
    error: null,
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_MESSAGES:
        case GET_ALLMESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            }
        case POST_MESSAGE:
            return {
                ...state,
                loading: false,
                messages: [payload, ...state.messages]
            }
        case GET_MESSAGE:
        case EDIT_MESSAGE:
            return {
                ...state,
                loading: false,
                message: payload
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                loading: false,                
                messages: state.messages.filter(mess => mess._id !== payload),
                message: null
            }
        case POST_REPLY:
            return {
                ...state,
                loading: false,
                message: {...state.message, replies: payload}
            }
        case DELETE_REPLY:
            return {
                ...state,
                loading: false,
                message: {...state.message, replies: state.message.replies.filter(rep => rep._id !== payload)}
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: true
            }
        default:
            return state;
    }
}
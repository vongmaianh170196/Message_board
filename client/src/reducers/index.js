import {combineReducers} from 'redux';
import message from './message';
import channel from './channel';
import auth from './auth';
import alert from './alert';

export default combineReducers({
    channel,
    message,
    auth,
    alert
});
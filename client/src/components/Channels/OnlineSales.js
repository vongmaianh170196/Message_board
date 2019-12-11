import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MessageList  from '../message/MessageList';
import {getChannelByName} from '../../actions/channel';
import AddMessageModal from '../layouts/AddMessageModal';

const OnlineSales = ({channel:{channel, loading}, getChannelByName}) => {    
    
    
    useEffect(() => {
        getChannelByName('Online sales');  
    }, [getChannelByName]);
    
    return (
        <Fragment>
            <AddMessageModal channel={channel}/>
            {!loading ? <MessageList channel={channel}/> : "Loading..."}
        </Fragment>
    );
}

OnlineSales.propTypes = {
    channel: PropTypes.object.isRequired,
    getChannelByName: PropTypes.func,
} 
const mapStateToProp = state => ({
    channel: state.channel
})

export default connect(mapStateToProp, {getChannelByName})(OnlineSales);
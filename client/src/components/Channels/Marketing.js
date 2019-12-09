import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddMessageModal from '../layouts/AddMessageModal';
import MessageList  from '../layouts/MessageList';
import {getChannelByName} from '../../actions/channel';

const Marketing = ({channel:{channel, loading}, getChannelByName}) => {       
    
    useEffect(() => {
        getChannelByName('Marketing');  
    }, [getChannelByName]);
    
    return (
        <Fragment>   
            <AddMessageModal channel={channel}/>         
            {!loading ? <MessageList channel={channel}/> : "Loading..."}
        </Fragment>
    );
}

Marketing.propTypes = {
    channel: PropTypes.object.isRequired,
    getChannelByName: PropTypes.func,
} 
const mapStateToProp = state => ({
    channel: state.channel
})

export default connect(mapStateToProp, {getChannelByName})(Marketing);
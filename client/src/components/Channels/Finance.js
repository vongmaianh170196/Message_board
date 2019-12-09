import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MessageList  from '../layouts/MessageList';
import {getChannelByName} from '../../actions/channel';
import AddMessageModal from '../layouts/AddMessageModal';

const Finance = ({channel:{channel, loading}, getChannelByName}) => {    
    
    
    useEffect(() => {
        getChannelByName('Finance');  
    }, [getChannelByName]);
    
    return (
        <Fragment>
            <AddMessageModal channel={channel}/>
            {!loading ? <MessageList channel={channel}/> : "Loading..."}
        </Fragment>
    );
}

Finance.propTypes = {
    channel: PropTypes.object.isRequired,
    getChannelByName: PropTypes.func,
} 
const mapStateToProp = state => ({
    channel: state.channel
})

export default connect(mapStateToProp, {getChannelByName})(Finance);
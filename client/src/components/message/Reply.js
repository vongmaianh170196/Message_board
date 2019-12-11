import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteReply} from '../../actions/message';

const Reply = ({reply, auth:{isAuthenticated, user}, message, deleteReply}) => {
    return (
        <div>
            <p>{reply.username}</p>
            <p>{reply.text}</p>
            {isAuthenticated && user.username === reply.username ? <p onClick={() => deleteReply(message._id, reply._id)}>Delete</p> : <p>{''}</p>}
        </div>
    )
}

Reply.propTypes = {
    auth: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    deleteReply: PropTypes.func,
}

const mapStateToProps = state => ({
    auth: state.auth,
    message: state.message.message
})

export default connect(mapStateToProps, {deleteReply})(Reply)

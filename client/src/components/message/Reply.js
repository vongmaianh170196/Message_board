import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteReply} from '../../actions/message';

const Reply = ({reply, auth:{isAuthenticated, user}, message, deleteReply}) => {
    return (
        <div className="reply-item">
            <p className="reply-username">@{reply.username}</p>
            <div className="reply-text-section">
                <p className="reply-text">{reply.text}</p>
                {isAuthenticated && user.username === reply.username ? <p className="clickable reply-del" onClick={() => deleteReply(message._id, reply._id)}><i className="fa fa-trash"></i></p> : <p>{''}</p>}
            </div>
            
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

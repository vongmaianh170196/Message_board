import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getAllMessages, getMessage } from '../../actions/message';

const Dashboard = ({messages, getAllMessages, getMessage}) => {
    useEffect(() => {
        getAllMessages();
    },[getAllMessages])
    return (
        <Fragment>
            {messages.length > 0 && messages.map(mess => <div key={mess._id}>
                <p className="message-title" onClick={(e) => {
                    e.preventDefault();
                    getMessage(mess.channel, mess._id);
                }}><Link to={`/messages/${mess._id}`}>{mess.title}</Link></p>
                <p className="message-desc">{mess.desc}</p>
            </div>)}
        </Fragment>
    )
}

Dashboard.propTypes = {
    messages: PropTypes.array.isRequired,
    getAllMessages: PropTypes.func.isRequired,
    getMessage: PropTypes.func,
}
const mapStateToProps = state => ({
    messages : state.message.messages
})

export default connect(mapStateToProps, {getAllMessages, getMessage})(Dashboard)

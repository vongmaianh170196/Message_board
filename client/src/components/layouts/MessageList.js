import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import MessageItem from './MessageItem';
import {getMessagesByChannel} from '../../actions/message';

const MessageList = ({message:{messages} , channel, getMessagesByChannel}) => {
    const [messageItem, setMessageItem] = useState({});
    useEffect(() => {
        getMessagesByChannel(channel._id)
    }, [getMessagesByChannel, channel])

    return (
        <Row>
            <Col className="col-4">
                {messages.map(message => 
                        <Fragment key={message._id}>
                            <p onClick={() => setMessageItem(message)}>{message.title}</p>
                        </Fragment>
                    )
                }
            </Col>
            <Col className="col-6">                
                <MessageItem message={messageItem}/>
            </Col>
        </Row>
    )
}

MessageList.propTypes = {
    message: PropTypes.object.isRequired,
    getMessagesByChannel: PropTypes.func,
    channel: PropTypes.object,
}
const mapStateToProps = state => ({
    message: state.message
})

export default connect(mapStateToProps, {getMessagesByChannel})(MessageList)

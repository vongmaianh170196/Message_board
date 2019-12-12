import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import MessageItem from './MessageItem';
import {getMessagesByChannel, getMessage} from '../../actions/message';

const MessageList = ({message:{messages} , channel, getMessagesByChannel, getMessage}) => {
   
    const [itemClick, setClicked] = useState(false);
    const [editable, setEditable] = useState(false);
    
    useEffect(() => {
        getMessagesByChannel(channel._id)
    }, [getMessagesByChannel, channel])

    const updateEditable = (editable) => {
        setEditable(editable)
    }

    return (
        <Row>
            <Col className="col-4">
                {messages.map(message => 
                        <Fragment key={message._id}>
                            <p className="message-title clickable" onClick={(e) => {
                                e.preventDefault();
                                setClicked(true);
                                editable && setEditable(false);
                                getMessage(channel._id, message._id);
                            }}>
                                <i className="fas fa-envelope-open-text"></i> {message.title}
                            </p>
                        </Fragment>
                    )
                }
            </Col>
            {
            messages.length <= 0 ? <p>There is no discussion created in this channel yet</p> : 
                itemClick && 
                <Col className="col-6">                
                    <MessageItem editable={editable} updateEditable={updateEditable}/>
                </Col>
            }
        </Row>
    )
}

MessageList.propTypes = {
    message: PropTypes.object.isRequired,
    getMessagesByChannel: PropTypes.func,
    channel: PropTypes.object,
    getMessage: PropTypes.func,
}
const mapStateToProps = state => ({
    message: state.message
})

export default connect(mapStateToProps, {getMessagesByChannel, getMessage})(MessageList)

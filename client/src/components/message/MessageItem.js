import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateMessage, deleteMessage, addReply} from '../../actions/message'; 
import Reply from './Reply';

const MessageItem = ({
    message,
    editable, 
    updateEditable, 
    auth:{isAuthenticated, user}, 
    channel,
    updateMessage,
    deleteMessage,
    addReply
    }) => {
    //const [editable, setEditable] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        desc: ''
    })
    const [reply, setReply] = useState("");

    useEffect(() => {
        setFormData({
            title: message ? message.title : '',
            desc: message ? message.desc : ''
        })
    }, [message])
    const {title, desc} = formData;

    const messageContent = () => (
        <div>
            <p>{title}</p>
            <p>{desc}</p>
            {isAuthenticated && user._id === message.user && 
                <div>                    
                    <button type="button" className="btn btn-light" onClick={() => updateEditable(true)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={(e) => onDelete(e)}>Delete</button>
                </div>                
            }
        </div>
    );

    const editMessage = () => (
        <form>
            <div className="form-group">
                <input type="text" className="form-control font-weight-bold" id="title" onChange={(e) => onChange(e)} defaultValue={title} name="title"/>
            </div>
            <div className="form-group">
                <textarea className="form-control" id="desc" defaultValue={desc} name="desc" onChange={(e) => onChange(e)}></textarea>
            </div>            
            <button type="submit" className="btn btn-primary" onClick={(e) => onSave(e)}>Save</button>
            <button type="submit" className="btn btn-primary" onClick={() => updateEditable(false)}>Cancel</button>
        </form>
    )

    const replyForm = () => (
        <form>
            <div className="form-group">
                <textarea placeholder="Write a reply..." className="form-control" id="text" defaultValue="" name="text" onChange={(e) => onChangeReply(e)}></textarea>
            </div>            
            <button type="submit" className="btn btn-primary" onClick={(e) => onSaveReply(e)}>Add</button>
        </form>
    )

    const onChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSave = (e) => {
        e.preventDefault();
        updateMessage(formData, channel._id, message._id);
    }
    const onDelete = (e) => {
        e.preventDefault();
        deleteMessage(message._id)
    }
    const onChangeReply = (e) => {
        e.preventDefault();
        setReply(e.target.value)
    }
    const onSaveReply = (e) => {
        e.preventDefault();
        addReply(reply, message._id)
    }

    return (
        <Fragment>
            {!message ? <p>No message is selected</p> :
                <Fragment>
                    {!editable? messageContent() : editMessage()}
                    <Fragment>
                        {isAuthenticated && replyForm()}
                    </Fragment> 
                    <Fragment>
                        {message.replies != null && message.replies.length > 0 ? message.replies.map(rep => <Reply reply={rep} key={rep._id}/>): ''}
                    </Fragment>                 
                </Fragment>                    
            }
        </Fragment>
    )
}

MessageItem.propTypes = {
    message : PropTypes.object,
    auth: PropTypes.object.isRequired,
    channel: PropTypes.object.isRequired,
    updateMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
    addReply: PropTypes.func,
};

const mapStateToProps = state => ({
    auth: state.auth,
    channel: state.channel.channel,
    message: state.message.message
})

export default connect(mapStateToProps, {updateMessage, deleteMessage, addReply})(MessageItem)


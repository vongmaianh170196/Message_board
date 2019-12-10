import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const MessageItem = ({message}) => {
    const [editable, setEditable] = useState(false);
    const {title, desc} = message;

    const onChange = (e) => {

    }

    const messageContent = () => (
        <div>
            <p>{title}</p>
            <p>{desc}</p>
            <button type="button" className="btn btn-light" onClick={() => setEditable(true)}>Edit</button>
        </div>
    );

    const editMessage = () => (
        <form>
            <div className="form-group">
                <input type="text" className="form-control font-weight-bold" id="title" onChange={(e) => onChange(e)} value={title} name="title"/>
            </div>
            <div className="form-group">
                <textarea className="form-control" id="desc" value={desc} name="desc" onChange={(e) => onChange(e)}></textarea>
            </div>            
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="submit" className="btn btn-primary" onClick={() => setEditable(false)}>Cancel</button>
        </form>
    )

    return (
        <Fragment>
            {!message ? <p>No message is selected</p> :
            <Fragment>
                {!editable? messageContent() : editMessage()}                 
            </Fragment>     
            }
        </Fragment>
    )
}

MessageItem.propTypes = {
    message : PropTypes.object,
}

export default MessageItem


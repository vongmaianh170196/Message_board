import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'

const MessageItem = ({message}) => {
    const [formDiabled, setDisabled] = useState(true)

    return (
        <Fragment>
            {!message ? <p>No message is selected</p> :
            <Fragment>
                <form>
                    <div class="form-group">
                        <input type="text" className="form-control font-weight-bold" id="title" defaultValue={message.title} name="title" disabled={formDiabled}/>
                    </div>
                    <div class="form-group">
                        <textarea className="form-control" id="desc" defaultValue={message.desc} name="desc" disabled={formDiabled}></textarea>
                    </div>
                    <button type="button" className="btn btn-light" onClick={() => setDisabled(!formDiabled)}>Edit</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </Fragment>     
            }
        </Fragment>
    )
}

MessageItem.propTypes = {
    message : PropTypes.object,
}

export default MessageItem


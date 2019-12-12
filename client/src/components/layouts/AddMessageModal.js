import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect } from 'react-redux';
import {postMessage} from '../../actions/message';

const AddMessageModal = ({auth:{isAuthenticated}, channel, postMessage}) => {
    
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        desc: ''
    });
    const {title, desc} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        postMessage(formData, channel._id);
        toggle();
    }
    const toggle = () => setModal(!modal);
   
    return (
            isAuthenticated 
            && <Fragment>
                    <Button color="primary" onClick={toggle}>Start a discussion</Button>
                    <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                        <ModalHeader toggle={toggle}>Add a message</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" onChange={e => onChange(e)} id="title" value={title} name="title" required/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" id="desc" onChange={e => onChange(e)} value={desc} name="desc" required ></textarea>
                                </div>                              
                            </form>                
                        </ModalBody>
                        <ModalFooter>               
                            <Button color="secondary" onClick={e => onSubmit(e)}>Create</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Fragment>
    )
}

AddMessageModal.propTypes = {
    auth: PropTypes.object.isRequired,
    channel: PropTypes.object,
    postMessage: PropTypes.func,
}
const mapStateToProp = state => ({
    auth: state.auth,
    channel: state.channel.channel
})

export default connect(mapStateToProp, {postMessage})(AddMessageModal)

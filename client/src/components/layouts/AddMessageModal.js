import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';

const AddMessageModal = ({auth:{isAuthenticated}}) => {
    
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        desc: ''
    });
    const {title, desc} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        //await axios.post(`/api/messages/${id}`, formData);
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
                                <div class="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" onChange={e => onChange(e)} id="title" value={title} name="title" required/>
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" id="desc" onChange={e => onChange(e)} value={desc} name="desc" required ></textarea>
                                </div>                              
                            </form>                
                        </ModalBody>
                        <ModalFooter>               
                            <Button color="secondary" onClick={e => onSubmit(e)}>Save</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Fragment>
    )
}

AddMessageModal.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProp = state => ({
    auth: state.auth
})

export default connect(mapStateToProp, null)(AddMessageModal)

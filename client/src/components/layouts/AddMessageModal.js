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
                    <Button color="primary" onClick={toggle}>Add message</Button>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <form onSubmit={e => onSubmit(e)}>
                                <label>Title</label>
                                <input type="text" defaultValue="" onChange={e => onChange(e)} name="title"/>
                                <br/>
                                <label>Description</label>
                                <input type="text" defaultValue="" onChange={e => onChange(e)} name="desc"/>
                                <br/>
                                <input type="submit" className="btn btn-primary my-1" />
                            </form>                
                        </ModalBody>
                        <ModalFooter>               
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

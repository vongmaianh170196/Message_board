import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login, register, logout } from '../../actions/auth';
import defaultAvatar from '../../img/defaultAvatar.jpg';

const Home = ({auth: {isAuthenticated, user}, login, logout, register}) => {

    const [formData, setFormData] = useState({
        username: '',
        password:'',
        avatar:''
    });

    const {username, password, avatar} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSignIn = e => {
        e.preventDefault();
        if(avatar !== ''){
            alert('You have already had an avatar')
        }
        else{            
            login({username, password});
            
        }
    }
    const onSignUp = e => {
        e.preventDefault();
        register({username, password});
    }
    const onLogout = e => {
        e.preventDefault();
        logout();
    }
    const guest = () => (
        <div className="d-flex justify-content-center row w-50 mx-auto flex-column">
            <form className="justify-content-left">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" onChange={e => onChange(e)} id="username" value={username} name="username"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" onChange={e => onChange(e)} value={password} name="password"/>
                </div>  
                <div className="form-group">
                    <label>Avatar</label>
                    <input type="text" placeholder="Add avatar link..." className="form-control" id="avatar" onChange={e => onChange(e)} value={avatar} name="avatar"/>
                </div>                
                <div className="d-flex justify-content-center flex-row">
                    <button type="submit" className="btn btn-outline-primary mr-1" onClick={(e) => onSignIn(e)}>Sign in</button>
                    <button type="submit" className="btn btn-outline-primary ml-1" onClick={(e) => onSignUp(e)}>Sign up</button>
                </div>
            </form>
            
        </div>
    );
    
    const auth = () => (
        <div className="d-flex justify-content-center">
            <img className="avatar-main" src={user.avatar !== null ? user.avatar : defaultAvatar}/>
            <p>{user.username}</p>
            <button type="button" className="btn btn-outline-primary mr-1" onClick={(e) => onLogout(e)}>Sign out</button>
        </div>
    )

    return (
        <Fragment>
            <h1 className="text-center">Welcome to Message Board</h1>
           {isAuthenticated && user !== null ? auth() : guest()}            
        </Fragment>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func,
    logout: PropTypes.func,
    register: PropTypes.func,
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login, logout, register})(Home)
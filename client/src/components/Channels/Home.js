import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login, register, logout } from '../../actions/auth';
import defaultAvatar from '../../img/defaultAvatar.jpg';

const Home = ({auth: {isAuthenticated, user}, login, logout, register}) => {

    const avatarImage = user === null ?  defaultAvatar : user.avatar === null || user.avatar === "" ?  defaultAvatar  : user.avatar;
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
        register({username, password, avatar});
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
                <div className="guest-btn-section d-flex justify-content-center flex-column">
                    <button type="submit" className="btn btn-positive" onClick={(e) => onSignUp(e)}>Sign up</button>
                    <p className="sign-in-btn-section">
                        <span>Already have an account? Click </span>
                        <span className="sign-in-btn clickable" onClick={(e) => onSignIn(e)}>Sign in</span>
                    </p>
                </div>
            </form>
            
        </div>
    );
    
    const auth = () => (
        <div className="d-flex justify-content-center flex-column auth-section">
            <img className="avatar-main" alt="avatar" src={avatarImage}/>
            <p className="welcome-username">{user.username}</p>
            <button type="button" className="btn btn-neutral" onClick={(e) => onLogout(e)}>Sign out</button>
        </div>
    )

    return (
        <Fragment>
            <h1 className="text-center welcome-text">Welcome to Message Board</h1>
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

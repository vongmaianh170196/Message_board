import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row} from 'reactstrap';
import defaultAvatar from '../../img/defaultAvatar.jpg';

const Header = ({auth: {isAuthenticated, user}}) => {
    const avatar = user === null ?  defaultAvatar : user.avatar === null ?  defaultAvatar  : user.avatar;
    return (
        <Row className="header">
            <div className="logo">
                <Link to='/messages'><i className="fas fa-comments"></i></Link>
            </div>
            <div className="header-username">
                {isAuthenticated && user !== null? 
                    <Link to='/'><img alt="user-icon" className="header-img" src={avatar}/><span> Hello {user.username}!</span></Link>
                    :  <Link to='/'><img alt="user-icon" className="header-img" src={avatar}/><span> Hello there!</span> </Link>
                }
            </div>
        </Row>
    )
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProp = state => ({
    auth: state.auth
})

export default connect(mapStateToProp, null)(Header);

import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row} from 'reactstrap';
import defaultAvatar from '../../img/defaultAvatar.jpg';

const Header = ({auth: {isAuthenticated, user}}) => {
    return (
        <Row className="header px-2 py-2 d-flex flex-row">
            <div>
                <Link to='/messages'><i className="fas fa-comments"></i></Link>
            </div>
            <div>
                {isAuthenticated && user !== null? 
                    <Link to='/'><img alt="user-icon" className="header-img" src={user.avatar !== '' ? user.avatar : defaultAvatar}/>Hello {user.username}!</Link>
                    :  <Link to='/'><img alt="user-icon" className="header-img" src={defaultAvatar}/>Hello there!</Link>
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

import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Home  from '../Channels/Home';
import Finance  from '../Channels/Finance';
import Marketing  from '../Channels/Marketing';
import  Music from '../Channels/Music';

const MessageLayout = ({channel: {loading}}) => {
    
    return (
            <Fragment>
                <Switch>     
                    <Route exact path='/' component={Home}/>         
                    <Route exact path='/finance' component={Finance}/>
                    <Route exact path='/marketing' component={Marketing}/>
                    <Route exact path='/music' component={Music}/>
                </Switch>           
            </Fragment>
    )
}
MessageLayout.propTypes = {
    channel: PropTypes.object.isRequired,
};
const mapStateToProp = state => ({
    channel: state.channel
})
export default connect(mapStateToProp,null)(MessageLayout);
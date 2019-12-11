import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Home  from '../Channels/Home';
import Finance  from '../Channels/Finance';
import Marketing  from '../Channels/Marketing';
import Entertainment from '../Channels/Entertainment';
import Dev from '../Channels/Dev';
import HumanResoucres from '../Channels/HumanResoucres';
import OnlineSales from '../Channels/OnlineSales';
import Ux from '../Channels/Ux';
import Dashboard from '../Channels/Dashboard';
import MessageItem from '../message/MessageItem';

const MessageLayout = ({channel: {loading}}) => {
    
    return (
            <Fragment>
                <Switch>     
                    <Route exact path='/' component={Home}/> 
                    <Route exact path='/messages'component={Dashboard}/> 
                    <Route exact path='/dev' component={Dev}/>
                    <Route exact path='/entertainment' component={Entertainment}/>      
                    <Route exact path='/finance' component={Finance}/>
                    <Route exact path='/hr' component={HumanResoucres}/> 
                    <Route exact path='/marketing' component={Marketing}/>
                    <Route exact path='/onlinesale' component={OnlineSales}/>
                    <Route exact path='/ux' component={Ux}/>

                    <Route exact path='/messages/:id' component={MessageItem}/>
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
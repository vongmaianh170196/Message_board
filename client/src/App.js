import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import { Navbar } from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import MessageLayout  from './components/layouts/MessageLayout';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

import {Provider} from 'react-redux';
import store from './store';
import { loaduser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loaduser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Container fluid className="container-custom">
          <Row className="justify-content-center h-100 main-content">
              <Col className="col-1"> <Navbar/></Col>
              <Col className="col-11 message-layout">
                <Alert/>     
                <Route component={MessageLayout}/>
              </Col>
          </Row>
        </Container>
        <Footer/> 
      </Router>
    </Provider>
  )
}

export default App;

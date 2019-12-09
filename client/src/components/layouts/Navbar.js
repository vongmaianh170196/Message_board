import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <Nav vertical>
            <NavItem>
                <Link to="/">Home</Link>
            </NavItem>
            <NavItem>            
                <Link to="/music">Music</Link>
            </NavItem>
            <NavItem>            
                <Link to="/finance">Finance</Link>
            </NavItem>
            <NavItem>            
                <Link to="/marketing">Marketing</Link>
            </NavItem>
            
            </Nav>
        </div>
    )
}

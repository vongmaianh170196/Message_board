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
                    <Link to="/dev">Dev</Link>
                </NavItem>
                <NavItem>            
                    <Link to="/entertainment">Entertainment</Link>
                </NavItem>
                <NavItem>            
                    <Link to="/finance">Finance</Link>
                </NavItem>
                <NavItem>            
                    <Link to="/hr">HR</Link>
                </NavItem>
                <NavItem>            
                    <Link to="/marketing">Marketing</Link>
                </NavItem>
                <NavItem>            
                    <Link to="/onlinesale">Online sales</Link>
                </NavItem>
                <NavItem>            
                    <Link to="/ux">UX</Link>
                </NavItem>
            </Nav>
        </div>
    )
}

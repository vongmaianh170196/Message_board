import React from 'react';
import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <Nav className="nav-custom flex-column">
                <NavLink to="/" className="nav_item nav_item_home" activeClassName="nav_item--active">Home</NavLink>
                <NavLink to="/messages" className="nav_item" activeClassName="nav_item--active">Dashboard</NavLink>
                <NavLink to="/dev" className="nav_item" activeClassName="nav_item--active">Dev</NavLink>
                <NavLink to="/entertainment" className="nav_item" activeClassName="nav_item--active" >Entertainment</NavLink>
                <NavLink to="/finance" className="nav_item" activeClassName="nav_item--active">Finance</NavLink>
                <NavLink to="/hr" className="nav_item" activeClassName="nav_item--active">HR</NavLink>
                <NavLink to="/marketing" className="nav_item" activeClassName="nav_item--active">Marketing</NavLink>
                <NavLink to="/onlinesale" className="nav_item" activeClassName="nav_item--active">Online sales</NavLink>
                <NavLink to="/ux" className="nav_item" activeClassName="nav_item--active">UX</NavLink>
            </Nav>
        </div>
    )
}

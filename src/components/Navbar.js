import React from "react";
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="main">
                <div className="mainLink">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                    <NavLink to="/comments" className={({ isActive }) => isActive ? 'active' : ''}>Comments</NavLink>
                    <NavLink to="/shoppingCartlist" className={({ isActive }) => isActive ? 'active' : ''}>Shopping Cart</NavLink>
                </div>
            </div>
        </div>
    );
};

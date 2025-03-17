import React from 'react';
import "./Header.css"
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-links" style={{ marginLeft: 'auto' }}>
                    <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Home</Link>
                    <Link to="/uvindex" className={location.pathname === "/uvindex" ? "nav-link active" : "nav-link"}>UV Index</Link>
                    <Link to="/uvdata" className={location.pathname === "/uvdata" ? "nav-link active" : "nav-link"}>UV Data</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
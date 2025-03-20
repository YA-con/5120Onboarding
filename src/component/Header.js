import React from "react";
import { Link } from 'react-router-dom'
import "./Header.css"
import Navbar from './Navbar'
import logo from "../assets/UV.png";

const Header = () => {
    return (
      <header className="header">
        <div className="header-content">
          <Link to="/">
            <div className="logo-section">
              <img src={logo} alt="UV Protection Logo" className="logo-img" />
              <div>
                <p className="title">UV Protect</p>
              </div>
            </div>
          </Link>
          <Navbar />
        </div>
      </header>
    );
  };
  
export default Header
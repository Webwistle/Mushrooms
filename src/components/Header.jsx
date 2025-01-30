import React from "react";
import "../styles/header.css";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Exclusive</div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Contact</li>
          <li>About</li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

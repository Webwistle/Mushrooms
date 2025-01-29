import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Exclusive</div>
      <nav>
        <ul className="nav-links">
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

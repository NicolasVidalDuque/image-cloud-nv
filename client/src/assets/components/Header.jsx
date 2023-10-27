import React from 'react';
import headerLogo from '../header-logo.png';
import profileIcon from '../profile.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header-left-section">
        <Link to='/'>
          <img src={headerLogo} alt="Logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right-section">
        <div className="header-profile-circle">
          <img src={profileIcon} alt="Profile" className="header-profile-image" />
        </div>
        <Link to="/RegisterUser" className="header-logout-link">Logout</Link>
      </div>
    </div>
  );
}

export default Header;

import React from 'react';
import headerLogo from '../header-logo.png';
import profileIcon from '../profile.png';

function Header() {
  return (
    <div className="header">
      <div className="header-left-section">
        <img src={headerLogo} alt="Logo" className="header-logo" />
      </div>
      <div className="header-right-section">
        <div className="header-profile-circle">
          <img src={profileIcon} alt="Profile" className="header-profile-image" />
        </div>
        <a href="#" className="header-logout-link">Logout</a>
      </div>
    </div>
  );
}

export default Header;

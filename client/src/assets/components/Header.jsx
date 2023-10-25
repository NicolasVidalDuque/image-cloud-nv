import React from 'react';

function Header() {
  return (
    <div className="header">
      <div className="header-left-section">
        <img src="your-logo.png" alt="Logo" className="header-logo" />
      </div>
      <div className="header-right-section">
        <div className="header-profile-circle">
          <img src="profile-image.jpg" alt="Profile" className="header-profile-image" />
        </div>
        <a href="#" className="header-logout-link">Logout</a>
      </div>
    </div>
  );
}

export default Header;

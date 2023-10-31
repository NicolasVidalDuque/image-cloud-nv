import React from 'react';
import headerLogo from '../header-logo.png';
import profileIcon from '../profile.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import axios from 'axios';
import {link} from '../../link.jsx'

function Header() {
  const {setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios.get(link + "profile", { withCredentials: true })
      .then(response => {
        const scopeUserInfo = response.data;
        setUserInfo(scopeUserInfo);
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
  },[])

  const logout = async () => {
    const response = await axios.post(link + 'logout',null, {withCredentials: true});
    setUserInfo(null);
    location.reload();
    alert('See you soon...')
  }

  const username = userInfo?.username

  return (
    <div className="header">
      <div className="header-left-section">
        <Link to='/'>
          <img src={headerLogo} alt="Logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right-section">
        <div className='header-dropdown'>
          <div className="header-profile-circle">
            <img src={userInfo?.profilePicture || profileIcon} alt="Profile" className="header-profile-image" />
          </div>
          <div className='header-dropdown-right'>
            <h3 to="/RegisterUser" className="header-logout-h">{userInfo?.username || 'Profile' }</h3>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        </div>
        <ul className='header-dropdown-list'>
          {userInfo?.username? 
            <>
              <li><Link to={'/'}>Your Gallery</Link></li>
              <li><Link onClick={logout} to={'/'}>Logout</Link></li>
            </>
          :
            <>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/registerUser'}>Sign Up</Link></li>
            </>
          }
        </ul>
      </div>
    </div>
  );
}

export default Header;

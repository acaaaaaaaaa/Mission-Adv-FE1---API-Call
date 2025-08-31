import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <img src="/images/icon-chill.png" alt="logo" className="logo" />
      <div className="nav-links">
        <Link to="/">Series</Link>
        <Link to="/">Film</Link>
        {user && <Link to="/my-list">Daftar Saya</Link>}
      </div>
      {user ? (
        <div className="profile">
          <img src="/images/user-profile.png" alt="user" className="profile-pic" />
          <i className="fa fa-caret-down caret-icon" onClick={toggleDropdown}></i>

                     {showDropdown && (
             <div className="dropdown-menu">
               <div className="dropdown-item" onClick={() => navigate('/profile')}>
                 <i className="fa fa-user"></i> Ubah Profil Saya
               </div>
               <div className="dropdown-item">
                 <i className="fa fa-star"></i> Ubah Premium
               </div>
               <div className="dropdown-item" onClick={handleLogout}>
                 <i className="fa fa-arrow-right-from-bracket"></i> Keluar
               </div>
             </div>
           )}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Masuk</Link>
          <Link to="/register" className="register-btn">Daftar</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

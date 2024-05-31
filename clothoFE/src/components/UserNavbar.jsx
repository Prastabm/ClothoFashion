import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Button, Navbar } from 'react-bootstrap';
import UserProfile from './UserProfile'; 


export const UserNavbar = ({ onLogout }) => {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const updatedUser = JSON.parse(sessionStorage.getItem('user'));
    setUser(updatedUser);
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <Navbar bg="success" data-bs-theme="dark"sticky="top" style={{height:'60px', padding:'0'}}>
       <Container style={{marginTop:'0'}}>
        <div className="navbar-brand">
          <Link to="/user-homepage">Clotho</Link>
        </div>
        <div className="navbar-links">
          <Link to="/user-homepage"><i className="fas fa-home"></i> Home</Link>
          <Link to="/about"><i className="fas fa-info-circle"></i> About Us</Link>
          <Link to="/wishlist"><i className="fas fa-heart"></i> Wishlist</Link>
          <Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link> 
          {user && (<Link to="#" onClick={toggleProfile}><i className="fas fa-user"></i> {user.name} </Link>
          )}
          <Button
            variant="success"
            onClick={onLogout}
            style={{ width: '40px', marginLeft: '1rem' }}
          >
            <i className="fa-solid fa-power-off" style={{ color: '#ffffff' }}></i>
          </Button>
        </div>
        {/* Conditional rendering of UserProfile component */}
        {showProfile && <UserProfile userId={user.id} />}
      </Container>
    </Navbar>
  );
}
export default UserNavbar;
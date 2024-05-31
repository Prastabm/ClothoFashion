import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';
import { getUser } from '../service/userAPI';


import avatar from '../assets/avatar.png'

const AdminNavbar = ({ onLogout, userId }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUser();
  },[]);
  
  return (
    <><Navbar bg="success" data-bs-theme="dark"sticky="top" style={{height:'60px', padding:'0'}}>
    <Container style={{marginTop:'0'}}>
      <Navbar.Brand as={Link} to="/dashboard">Clotho</Navbar.Brand>
      <Nav className=" justify-content-end">
        <p className='mt-3' style={{color:"white", fontWeight:"bold"}}>Hello Admin</p>
        
        <Dropdown  >
        <Dropdown.Toggle as="a" className="nav-link p-0" style={{ cursor: 'pointer', marginTop:'0.75rem' }}>
              <img className='mx-2' src={avatar} style={{ height: '32px', width: '32px' }} alt="avatar" />
            </Dropdown.Toggle>
            
        
              <Dropdown.Menu align="end" style={{ marginTop: '10px' }}>
              {user && (
    <Dropdown.Item as={Link} to={`/edit-profile/${user.id}`}>
      Edit Profile
    </Dropdown.Item>
  )}                <Dropdown.Item onClick={onLogout} className='logout-link'>Logout</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Container>
  </Navbar></>
  )
}

export default AdminNavbar
import React, { useState, useEffect } from 'react';
import { getUser } from '../service/userAPI';
import { Link } from 'react-router-dom';
import './UserProfile.css'; 
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

const UserProfile = ({ userId }) => {
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
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-dropdown">
      <div className="user-profile-header">
      <Avatar style = {{marginRight : '10px'}}>
      <PersonIcon />
    </Avatar>
        <div>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="user-profile-links">
        <Link to="/user-orders-page">My Orders</Link>
        <Link to="/wishlist">My Wishlist</Link>
        <Link to={`/user/edit-profile/${user.id}`}>Edit Profile</Link>

      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { login } from '../service/userAPI'; // Import your login function

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedUser = await login(email, password);
      if (fetchedUser.status !== 200) {
        setError('Wrong Credentials. Please try again.');
        return;
      }

      sessionStorage.setItem('user', JSON.stringify(fetchedUser.data));

      // Redirect based on user role (optional)
      const userRole = String(fetchedUser.data.role).toLowerCase();
      switch (userRole) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'agent':
          navigate('/agent-dashboard');
          break;
        case 'user':
          navigate('/user-homepage');
          break;
        default:
          setError('Invalid user role.');
          navigate('/');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-container">
        <h1>WELCOME TO CLOTHO</h1>
        <br />
        <p>Where style meets convenience!</p>
      </div>
      
      <div className="login-container"> 
        <form onSubmit={handleSubmit} className="form-container">
          <h1 className="form-title">Login</h1>
          <br />
          <div className="form-group">
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              placeholder="Email"
              value={email}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={password}
              required
              onChange={handleChange}
            />
          </div>
          <div className="login-link">
            <br />
            New user? <Link to="/registration">Register</Link><br />
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
            <br />
        
          <button type="submit" className="form-button">Login</button>
          <br />
          {error && <p className="error-message">{error}</p>}
        </form>
        
      </div>
      </div>
  );
}

export default Login;

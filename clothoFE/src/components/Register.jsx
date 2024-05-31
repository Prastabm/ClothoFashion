import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { addUser } from '../service/userAPI';

function Register() {
  const navigate = useNavigate();
  const [user, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    name: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...user, [name]: value });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword, name, address, city, postalCode } = user;
    if (!username || !email || !password || !confirmPassword || !name || !address || !city || !postalCode) {
      return "All fields are required.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await addUserDetails();
      navigate('/'); 
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 409) {
        setError(error.response.data);

      } else {
        setError('User Exists!');
      }
    }
  };

  const addUserDetails = async () => {
    const address = `${user.address}, ${user.city} - ${user.postalCode}`;
    const newUser = { ...user, address };
    await addUser(newUser);
  };

  return (
    <div className="App">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1>Register Now</h1>
        <table>
          <tbody>
            <tr>
              <td colSpan="3">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter a username"
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email id"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a password"
                  required
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter street name"
                  required
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Enter your postal code"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="login-link">
          Already a user? <Link to="/">Login</Link>
        </div>
        <br />
        <button type="submit">REGISTER</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default Register;

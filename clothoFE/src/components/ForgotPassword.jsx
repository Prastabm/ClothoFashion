import React, { useState } from 'react';
import './ForgotPassword.css';
import { Form, Button } from 'react-bootstrap';
import { editUser, getUserByEmail } from '../service/userAPI';
import { sendOTP } from '../service/commAPI';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const navigate = useNavigate();
  const [emailScreen, setEmailScreen] = useState(true);
  const [otpScreen, setOtpScreen] = useState(false);
  const [passwordScreen, setPasswordScreen] = useState(false);

  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const generateOtp = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendOTPEmail = async (userEmail) => {
    const otp = generateOtp();
    setGeneratedOTP(otp);

    try {
      const data = {
        to: userEmail,
        subject: 'OTP for resetting Password',
        body: otp,
      };
      const response = await sendOTP(data);
      console.log('OTP response:', response);

      if (response === 'OTP sent successfully') { // Adjusted condition to match string response
        setEmailScreen(false);
        setOtpScreen(true);
      } else {
        console.log('Response did not indicate success:', response);
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Failed to send OTP. Try again.');
      setErrorStatus(true);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setErrorMessage('Please enter an email address.');
      setErrorStatus(true);
      return;
    }

    try {
      const userData = await getUserByEmail(email);
      setUser(userData);
      await sendOTPEmail(userData.email);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      setErrorMessage('Email not found. Try again.');
      setErrorStatus(true);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpVerification = () => {
    if (otp === generatedOTP) {
      setOtpScreen(false);
      setPasswordScreen(true);
      setErrorStatus(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
      setErrorStatus(true);
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      // Call an API or function to update the password
      const userEditData= JSON.stringify({
        name: user.name,
        role: user.role,
        email: user.email,
        username: user.username,
        password: newPassword,
        img: user.img,
        address: user.address
      })
      const userEditResponse = await editUser(user.id, userEditData);
      console.log(userEditResponse);
      alert("password reset successful");
      navigate('/');
      
    } else {
      setErrorMessage('Passwords do not match. Please try again.');
      setErrorStatus(true);
    }
  };

  return (
    <>
      {emailScreen && (
        <div className='main-container'>
          <h3 style={{ textAlign: 'center' }}>Forgot Password</h3>
          <p style={{ textAlign: 'center' }}>Enter your email to reset your password</p>
          <br />
          <Form className='mb-1' onSubmit={handleEmailSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ width: '100%', border: '1px solid green' }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Send OTP
            </Button>
          </Form>
          <br />
          {errorStatus && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </div>
      )}

      {otpScreen && (
        <div className='main-container'>
          <h3 style={{ textAlign: 'center' }}>Verify OTP</h3>
          <p style={{ textAlign: 'center' }}>Enter the OTP sent to email</p>
          <br />
          <Form className='mb-1'>
            <Form.Group controlId="formOTP">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                style={{ width: '100%', border: '1px solid green' }}
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </Form.Group>
            <Button className='mt-2' variant="success" onClick={handleOtpVerification}>
              Verify OTP
            </Button>
          </Form>
          <br />
          {errorStatus && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </div>
      )}

      {passwordScreen && (
        <div className='main-container'>
          <h3 style={{ textAlign: 'center' }}>Set New Password</h3>
          <br />
          <Form className='mb-1'>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Enter new Password</Form.Label>
              <Form.Control
                style={{ width: '100%', border: '1px solid green' }}
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm new Password</Form.Label>
              <Form.Control
                style={{ width: '100%', border: '1px solid green' }}
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>
            <Button className='mt-2' variant="success" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </Form>
          <br />
          {errorStatus && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </div>
      )}
    </>
  );
};

export default ForgotPassword;

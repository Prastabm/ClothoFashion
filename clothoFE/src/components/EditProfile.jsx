import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, editUser } from '../service/userAPI';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './EditProfile.css';

const EditProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    password: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editUser(userId, formData);
      if (response.status === 200) {
        const updatedUserDetails = response.data;
        setUser(updatedUserDetails);
        sessionStorage.setItem('user', JSON.stringify(updatedUserDetails));
        alert('User details updated successfully!');
      } else {
        console.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ width: '700px' , marginTop : "45px"}} fluid>
      <h2 className='text-center'>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col md={5}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={5}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={5}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={5}></Col>
        </Row>
        <Row className="justify-content-center">
          <Button
            type="submit"
            style={{ backgroundColor: 'green', borderColor: 'green', width: '150px', marginTop : '30px' }}
          >
            Update Profile
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default EditProfile;

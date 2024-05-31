import React from 'react'
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { sendMessage } from '../service/commAPI';
export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: 'Jane Smith',
        location: 'KOL',
        email: 'prastabm@gmail.com',
        type: 'Product Inquiry',
        message: 'I\'m interested in your product. Can you provide more details?'
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const send = await sendMessage(formData);
            if(send != null){
                alert("Message Sent Successfully");
            }
        }catch(error){
            alert("Something went wrong");
        }

      };
      
      return (
        <Container fluid className='p-5 ' style={{backgroundColor: 'green', width:'94%', marginLeft:'0.5rem', borderRadius:'2rem', boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
          <h1 style={{color:'white', fontWeight:'lighter', backdropFilter:'blur'}}>Contact Us</h1>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>
    
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </Form.Group>
    
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>
    
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Product Inquiry</option>
                <option>Feedback</option>
                <option>Grievance</option>
              </Form.Control>
            </Form.Group>
    
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
              />
            </Form.Group>
            <br></br>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}
export default ContactUs;
import React from 'react';
import { Container, Card, ListGroup, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderSummaryPage = () => {
  const shippingDetails = JSON.parse(sessionStorage.getItem('shippingDetails'));
  const discountedTotalAmount = parseFloat(sessionStorage.getItem('discountedTotalAmount')) || 0;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/user-homepage');
  };

  if (!shippingDetails) {
    return (
      <Container className="order-summary-container">
        <Row>
          <Col>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Error</Alert.Heading>
              <p>Shipping details not found. Please complete the checkout process.</p>
              <Button style={{backgroundColor : 'green', width : '200px'}} onClick={() => navigate('/checkout')}>
                Go to Checkout
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const fullAddress = `
  ${shippingDetails.address},
  ${shippingDetails.city},
  ${shippingDetails.state} - ${shippingDetails.zipCode},
  ${shippingDetails.country}
`;
  return (
    <Container className="order-summary-container">
      <Row>
        <Col style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
          <Card className="text-left" style={{width : '500px'}}>
            <Card.Header style={{textAlign : 'center'}}>
              <h2>Order Confirmed!</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title style={{textAlign : 'center'}}>Order Summary</Card.Title>
              <ListGroup variant="flush mt-4" >
               <ListGroup.Item><strong>Full Name:</strong> {shippingDetails.fullName}</ListGroup.Item>
                <ListGroup.Item><strong>Address:</strong> {fullAddress}</ListGroup.Item>
                <ListGroup.Item><strong>Phone Number:</strong> {shippingDetails.phone}</ListGroup.Item>
                <ListGroup.Item><strong>Total Amount:</strong> ${discountedTotalAmount.toFixed(2)}</ListGroup.Item>
              </ListGroup>
              <div className="d-flex justify-content-between mt-3">
                <Button className='btn1' style={{ backgroundColor: 'green', width: '150px' }} onClick={handleGoBack}>
                  Go to Home
                </Button>
                <Button className='btn2' style={{ backgroundColor: 'green', width: '150px' }} onClick={() => navigate('/user-orders-page')}>
                  Go to Orders
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSummaryPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { getProductById } from '../service/productAPI';
import cartAPI from '../service/cartAPI';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '../service/orderAPI';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] =useState('');
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const generateOrderId = () => {
      setOrderId(uuidv4().toString());
    }
    const fetchCartItems = async () => {
      try {
        const items = await cartAPI.getCartItemByUserId(user.id);
        setCartItems(items);
        const productDetailsPromises = items.map((item) => getProductById(item.productId));
        const products = await Promise.all(productDetailsPromises);
        setProductDetails(products);
        calculateTotalAmount(items, products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    generateOrderId();
    fetchCartItems();
  }, [user.id]);

  function getProductPriceFromSession(productId) {
    // Retrieve session data
  
    // Check if session data exists
    if (productDetails) {
      try {
        // Parse session data into JSON object
  
        // Find the product with the given productId
        const product = productDetails.find(product => product.id === productId);
  
        // Check if product is found
        if (product) {
          // Return the price of the product
          return product.price;
        } else {
          // Product not found
          console.error(`Product with productId ${productId} not found.`);
          return null;
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    } else {
      // Session data not found
      console.error('No session data found.');
      return null;
    }
  }
  

  const calculateTotalAmount = (items, products) => {
    let totalAmount = 0;
    items.forEach((item, index) => {
      totalAmount += products[index].price * item.quantity;
    });
    setTotalAmount(totalAmount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevShippingDetails) => ({...prevShippingDetails,[name]: value}));
  };

  async function processCartItems(cartItems, user, shippingDetails) {
    const promises = cartItems.map(async (item) => {
      await createOrder(JSON.stringify({
        orderId: orderId, // Assuming generateOrderId() creates a unique order ID
        active: true,
        userId: user.id,
        productId: item.productId,
        price: getProductPriceFromSession(item.productId), // Assuming price is included in cart item, otherwise fetch it from productDetails
        address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.zipCode}, ${shippingDetails.country}`,
        quantity: item.quantity
      }));
    });
  
    await Promise.all(promises);
  }

  const handleSubmit = (e) => {
    console.log('Submitting form...');
    // Process payment and order
    console.log('Shipping details:', shippingDetails);
    sessionStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    sessionStorage.setItem('productDetails', JSON.stringify(productDetails));
    processCartItems(cartItems, user, shippingDetails);
  {/*}
  "orderId": "ORD12345",
  "active": true,
  "userId": 1,
  "productId": 100,
  "price": 99.99,
  "address": "123 Main St, Springfield, USA",
  "quantity": 2
}
*/}

    
    navigate('/order-confirmation');
  };

  const discountedTotalAmount = parseFloat(sessionStorage.getItem('discountedTotalAmount')) || totalAmount;
  

  if (loading) {
    return <p>Loading checkout details...</p>;
  }

  return (
    <Container className="checkout-container">
      <Row>
        <Col md={6}>
          <Card className="checkout-card">
            <Card.Header>
              <h2>Shipping Details</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Shipping details form inputs */}
                {/* Full Name */}
                <Form.Group controlId="formFullName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={shippingDetails.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                {/* Address */}
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Street Name </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                {/* City */}
                <Form.Group controlId="formCity" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                {/* State */}
                <Form.Group controlId="formState" className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your state"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                {/* Zip Code */}
                <Form.Group controlId="formZipCode" className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your zip code"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                {/* Country */}
                <Form.Group controlId="formCountry" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                {/* Phone Number */}
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
               
               
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Checkout</h2>
          {cartItems.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{productDetails[index].pname}</td>
                    <td>{item.quantity}</td>
                    <td>{productDetails[index].price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Your cart is empty!</p>
          )}
          <div className="total-amount">
            <h5>Total Amount (with discount): ${discountedTotalAmount.toFixed(2)}</h5>
          </div>
          <Button
  style={{ width: '200px', backgroundColor: 'green', position: 'relative', left: '35%', top: "20px" }}
  type="button"  // Change the type to "button"
  onClick={handleSubmit} // Assign the handleSubmit function directly to onClick
>
  Place Order
</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;

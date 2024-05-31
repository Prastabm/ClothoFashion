
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Col, Row, Modal, Form, Image } from 'react-bootstrap';
import { getProductById, calculateDiscount } from '../service/productAPI';
import cartAPI from '../service/cartAPI';
import './CartPage.css';
import shirt from '../assets/shirt.jpeg'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [condition, setCondition] = useState('');


  let discount = sessionStorage.getItem('discount');



  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await cartAPI.getCartItemByUserId(user.id);
        setCartItems(items);
        const productDetailsPromises = items.map((item) => getProductById(item.productId));
        const products = await Promise.all(productDetailsPromises);
        setProductDetails(products);
        calculateTotalPrice(items, products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user.id]);

  const fetchCartItems = async () => {
    try {
      const items = await cartAPI.getCartItemByUserId(user.id);
      setCartItems(items);
      const productDetailsPromises = items.map((item) => getProductById(item.productId));
      const products = await Promise.all(productDetailsPromises);
      setProductDetails(products);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    discount = await calculateDiscount({ age: parseInt(age), premium: isPremium, condition });
    sessionStorage.setItem('discount' , discount);
    window.location.reload();
  };


  const calculateTotalPrice = (items, products) => {
    let totalPrice = 0;
    items.forEach((item, index) => {
      totalPrice += products[index].price * item.quantity;
    });
    setTotalPrice(totalPrice);
    const discountedTotalAmount = discount ? totalPrice - (totalPrice * (discount / 100)) : totalPrice;
    sessionStorage.setItem('discountedTotalAmount', discountedTotalAmount);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await cartAPI.deleteCartItem(user.id, productId);
   
      fetchCartItems();
      window.location.reload();
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await cartAPI.updateCartItemQuantity(itemId, quantity);
     
      fetchCartItems();
     
      window.location.reload();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  const handleExchangeProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  return (
    <Container className="cart-container" fluid>
      <Row style={{height:'auto'}}>
        <Col md={7}>
          <h2 className="cart-title mb-4">My Cart</h2>
          {cartItems.length > 0 ? (
            <Table striped bordered hover className="cart-table">
              <thead>
                <tr>
                  <th> Img </th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td><Image src={`data:${productDetails[index].imgType};base64,${productDetails[index].img}`} rounded style={{ height: '40px' }} /> </td>
                    <td>{productDetails[index].pname}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                          className="me-2"
                          variant="secondary"
                          style={{ width: '10%' }}
                          onClick={() => handleUpdateQuantity(item.itemId, -1)}
                        >
                          -
                        </Button>
                        <input type="number" style={{ width: '15%' }} value={item.quantity} readOnly />
                        <Button
                          className="ms-2"
                          variant="secondary"
                          style={{ width: '10%' }}
                          onClick={() => handleUpdateQuantity(item.itemId, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>{productDetails[index].psize}</td>
                    <td>{productDetails[index].price * item.quantity}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveFromCart(item.productId)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Your cart is empty!</p>
          )}
        </Col>
        <Col md={4} className='p-3' style={{marginTop:'1rem', border : '1px solid black', borderRadius : '20px'}}>
          <div className="total-price-container">
            <h5> Total Amount</h5>
            <p>Base Price: ${totalPrice}</p>
            <p> Discount Applied: {(discount) ? (totalPrice * (discount/100)) : 0}</p>
            <hr />
            <p> Total Amount : ${totalPrice - (totalPrice * (discount/100))}</p>
            <Button variant="primary" style={{width: '20%'}} onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button variant="secondary " style={{width: '60%', marginLeft : '20px'}} onClick={handleExchangeProduct}>
              Exchange Product for Discount
            </Button>
          </div>
        </Col>
      </Row>
      {/* Exchange Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered fluid>
        <Modal.Header closeButton>
          <Modal.Title>Exchange Product for Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formIsPremium">
        <Form.Check
          type="checkbox"
          label="Premium"
          checked={isPremium}
          onChange={(e) => setIsPremium(e.target.checked)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCondition">
        <Form.Label>Condition</Form.Label>
        <Form.Control
          as="select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Select condition</option>
          <option value="best">Best</option>
          <option value="good">Good</option>
          <option value="avg">Average</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
       
      </Modal>
    </Container>
  );
};

export default CartPage;

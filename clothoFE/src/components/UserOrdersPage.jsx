import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getOrdersByUserId, createOrder, deleteOrder } from '../service/orderAPI';
import cartAPI from '../service/cartAPI';
import { getProductById } from '../service/productAPI';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersByUserId(user.id);
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        setLoading(false); // Ensure loading state is updated even in case of error
      }
    };

    fetchOrders();
  }, [user.id]);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrdersByUserId(user.id);
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setLoading(false); // Ensure loading state is updated even in case of error
    }
  };
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      await deleteOrder(orderId);
      const updatedOrders = orders.filter((order) => order.orderId !== orderId); // Corrected property name
      setOrders(updatedOrders);
      alert('Order canceled successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error canceling order:', error.message);
      alert('Failed to cancel order. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading user orders...</p>;
  }

  return (
    <Container>
      <h2 className="text-center my-4">My Orders</h2>
      <Row>
        {orders.map((order) => (
          <Col md={4} key={order.id} className="mb-4">
            <Card>
              <Card.Header>Order ID: {order.orderId}</Card.Header>
              <Card.Body>
                <ProductDetails productId={order.productId} />
                <p>Quantity: {order.quantity}</p>
                <p>Address: {order.address}</p>
                <p>Price: ${order.price.toFixed(2)}</p>
                {(order.active)?<Button variant="danger" style = {{width: '40%'}}onClick={() => handleCancelOrder(order.id)}>
                  Cancel Order
                </Button>:<p style={{color:'red'}}>Order has been cancelled</p>}
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Product details not available.</p>;
  }

  return (
    <>
      <p>Product: {product.pname}</p>
      {/* Display other product details based on your structure */}
    </>
  );
};

export default UserOrdersPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/orders');
        console.log(response.data);
        setOrders(response.data);
        // Log the orders after the state has been updated
        console.log(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <h2>Orders Page</h2>
      <p>View all active and inactive orders</p>
      <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>UserID</th>
            <th>ProductID</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{order.productId}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.address}</td>
              
      
              <td>{order.active ? <Badge pill bg="success">
        Active
      </Badge> : <Badge pill bg="danger">
        Cancelled
      </Badge>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>

      
    </>
  );
};

export default OrdersPage;
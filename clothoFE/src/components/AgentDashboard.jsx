import {React, useState, useEffect} from 'react'
import { Container, Stack, Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from '../assets/products.png';
import comm from '../assets/comm.png';
import { getTotalListByProducts } from '../service/productAPI';
import { getTotalMessagesByLoc } from '../service/commAPI';
export const AgentDashboard = () => {
    const[totalMsgs, setTotalMsgs] = useState(0);
    const[totalProducts, setTotalProducts] = useState(0);
    const user = JSON.parse(sessionStorage.getItem('user'));
    useEffect(() => {
       
    
        
        const fetchProducts = async() =>{
          try{
            const total = await getTotalListByProducts(user.email);
            console.log('Total Products', total);
            setTotalProducts(total);
          }
          catch(error){
            console.error('error fetching products:', error);
          }
        }
    
        const fetchMessages = async()=>{
          try{
            const total = await getTotalMessagesByLoc(user.address);
            console.log('Total messages', total);
            setTotalMsgs(total);
          }
          catch(error){
            console.error('error fetching messages:', error);
          }
        }
        fetchProducts();
        fetchMessages();
      }, []);
  return (
    <>
    <h2>Dashboard</h2>
      <p>Welcome to the Agent Dashboard</p>
      <Container fluid>
        <Stack direction='horizontal'>
        <div className="p-2 ms-auto me-3 " style={{marginTop:'10rem'}} >
        <Card style={{ width: '23rem' }} className='shadow-tile'>
      <Card.Body>
      <Row>
          <Col md={8}>
            <Card.Title>Products</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{totalProducts}</Card.Subtitle>
        
            <Card.Link className="btn btn-success mt-4" as={Link} to="/agent-products">View Products</Card.Link>
          </Col>
          <Col md={4} className='pt-2'>
          <Image src={products} rounded fluid />
          </Col>
        </Row>
      </Card.Body>
    </Card>
          </div>
          <div className="p-2  me-auto ms-3 " style={{marginTop:'10rem'}}>
          <Card style={{ width: '24rem' }} className='shadow-tile'>
      <Card.Body>
      <Row>
          <Col md={8}>
            <Card.Title>Communications</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{totalMsgs}</Card.Subtitle>
        
            <Card.Link className="btn btn-success mt-4" as={Link} to="/agent-communication">View Communications</Card.Link>
          </Col>
          <Col md={4} className='pt-2'>
          <Image src={comm} rounded fluid />
          </Col>
        </Row>
      </Card.Body>
    </Card>
          </div>
        </Stack>
      </Container>
    </>
    
  )
}
export default AgentDashboard;
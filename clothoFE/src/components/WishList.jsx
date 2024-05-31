import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Toast, ToastContainer,Row, Col, Image } from 'react-bootstrap';
import { getWishlistItemByUserId, deleteWishlistItem } from '../service/wishlistAPI';
import { getProductById } from '../service/productAPI';
import cartAPI from '../service/cartAPI';
import './Wishlist.css';
import shirt from '../assets/shirt.jpeg'

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlistItemByUserId(user.id);
        if (response.length === 0) {
          console.log('No items in wishlist');
          
          return;
        }
        const productDetailsPromises = response.map((item) => getProductById(item.productId));
        const products = await Promise.all(productDetailsPromises);
        setWishlistItems(products);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        setShowToast(true);
        setToastMessage('Failed to load wishlist items. Please try again later.');
        setToastVariant('danger');
      }
    };

    fetchWishlist();
  }, [user.id]);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlistItemByUserId(user.id);
      if (response.length === 0) {
        console.log('No items in wishlist');
        setWishlistItems([]);
        return;
      }
      const productDetailsPromises = response.map((item) => getProductById(item.productId));
      const products = await Promise.all(productDetailsPromises);
      setWishlistItems(products);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      setShowToast(true);
      setToastMessage('Failed to load wishlist items. Please try again later.');
      setToastVariant('danger');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const productDetails = await getProductById(productId);
      if (!productDetails) {
        setShowToast(true);
        setToastMessage('This product does not exist.');
        setToastVariant('danger');
        return;
      }

      await cartAPI.addCartItem({ userId: user.id, productId: productId });
      await deleteWishlistItem(user.id, productId);
      

      setShowToast(true);
      setToastMessage('Item added to cart!');
      setToastVariant('success');
      fetchWishlist();

    } catch (error) {
      console.error('Error adding to cart:', error);
      setShowToast(true);
      setToastMessage('An error occurred. Please try again later.');
      setToastVariant('danger');
    }
  };
const handleDelete = async(productId) => {
try {
  await deleteWishlistItem(user.id, productId);
  fetchWishlist();
}
catch(error) {
      setShowToast(true);
      setToastMessage('An error occurred. Please try again later.');
      setToastVariant('danger');
}
}
  return (
    <Container>

      <h2 className="my-wishlist-title mb-4">My Wishlist</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {console.log(wishlistItems)}
        {wishlistItems.map((item) => (
          <Card key={item.id} className="m-2" style={{ width: '40rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
             
              <Row className='mb-5'> <Col md = {7}>
              <Card.Title>{item.pname}</Card.Title>
              <Card.Text>
                Price: ${item.price}
                <br />
                Size: {item.psize}
              </Card.Text>
              </Col>
              <Col md = {5} style = {{textAlign : 'end'}}>
              <Image src={`data:${item.imgType};base64,${item.img}`} rounded style={{ height: '100px' }} />

              </Col></Row>
              
              <div className="d-flex justify-content-evenly">
                <Button
                  variant="danger"
                  style={{ width: '40%', minWidth: '80px' }}
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="success"
                  style={{ width: '40%', minWidth: '80px' }}
                  onClick={() => handleAddToCart(item.id)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Cart</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Wishlist;

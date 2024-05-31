import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Image, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllListedProducts, getProductById } from '../service/productAPI';
import { addWishlistItem, deleteWishlistItem } from '../service/wishlistAPI';
import cartAPI from '../service/cartAPI';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Product.css';
import ContactUs from './ContactUs';

const HomePage = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllListedProducts();
        setFetchedProducts(response.data || response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleViewProduct = async (productId) => {
    setSelectedProductId(productId);
    try {
      const productDetails = await getProductById(productId);
      console.log(productDetails); // Log the product details to check if imgType and image are present
      setSelectedProduct(productDetails);
      setShowProductModal(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProductId(null);
    setSelectedProduct(null);
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await addWishlistItem(user.id, productId);
      if (response.status === 200) {
        setShowToast(true);
        setToastMessage('Added to wishlist!');
        setToastVariant('success');
      } else {
        setShowToast(true);
        setToastMessage('Something went wrong. Please try again.');
        setToastVariant('warning');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setShowToast(true);
      setToastMessage('An error occurred. Please try again later.');
      setToastVariant('danger');
    }
  };
  const handleAddToCart = async (productId) => {
    try {
      // Add the product to the cart using only the product ID and user ID
      await cartAPI.addCartItem({
        userId: user.id,
        productId: productId,
      });
      setShowToast(true);
      setToastMessage('Added to cart!');
      setToastVariant('success');
      // Remove the product from the wishlist
      await deleteWishlistItem(user.id, productId);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  const filteredProducts = fetchedProducts.filter((product) =>
    product.pname.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Container fluid style={{height:'90vh'}}> 
        <Form.Control
          style={{ padding: '0.6rem', borderRadius: '2rem', width: '95%', border: '1px solid green' }}
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="product-container">
        <Row style={{ marginTop: '2rem'}}>
          {filteredProducts.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={product.id} >
              <Card className='product-card'>
                <Card.Img className='card_img' variant="top" src={`data:${product.imgType};base64,${product.img}`} alt={product.pname} />
                <Card.Body>
                  <Card.Title>{product.pname}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  {(product.qty > 5)?<p>Qty: {product.qty}</p>:(product.qty > 1)?<p style={{color:'red'}}>Hurry! Limited stock left</p>:<p style={{color:'red'}}>Hurry! Only 1 item left</p>}
                  <Button title="Add to Wishlist" onClick={() => addToWishlist(product.id)} style={{ width: '20%' }} variant="success">
                    <i className="fas fa-heart"></i>
                  </Button>{' '}
                  <Button
                    title="View"
                    style={{ width: '20%' }}
                    variant='primary'
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <i className="fa-solid fa-eye" style={{ color: "#ffffff" }}></i>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
        <ContactUs/>
      </Container>
        
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showProductModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        {selectedProduct ? (
          <Modal.Body>
            <Row>
              <Col>
                <Image src={`data:${selectedProduct.imgType};base64,${selectedProduct.img}`} rounded style={{ height: '300px', width: '100%' }} />
              </Col>
              <Col md={8}>
                <h3>{selectedProduct.pname}</h3>
                <p>Category: {selectedProduct.category}</p>
                <p>Price: ${selectedProduct.price}</p>
                <p>Size: {selectedProduct.psize}</p>
                <p>Premium: {selectedProduct.premium ? 'Yes' : 'No'}</p>
                <p>Description: {selectedProduct.description}</p>
              </Col>
            </Row>
          </Modal.Body>
        ) : (
          <Modal.Body>Loading...</Modal.Body>
        )}
        <Modal.Footer>
          <Container fluid>
            <Row>
              <Col xs={6}>
                <Button variant="success" onClick={() => handleAddToCart(selectedProduct.id)} style={{ width: '100%' }}>
                  Add to Cart
                </Button>
              </Col>
              <Col xs={6}>
                {selectedProduct && (
                  <Button title="Add to Wishlist" onClick={() => addToWishlist(selectedProduct.id)} style={{ width: '100%' }}  variant="outline-success">
                    Add to Wishlist
                </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Home Page</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default HomePage;
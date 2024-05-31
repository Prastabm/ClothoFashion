import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button, Modal, Form, InputGroup, FormControl, Row, Col, Toast } from 'react-bootstrap';
import { createProduct, unlistProduct, enlistProduct,getProductById, deleteProduct } from '../service/productAPI';
import UpdateProductModal from './updateProductModal';
const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
    const email = user.email;
    const [newProduct, setNewProduct] = useState({
      pname: "",
      premium: true,
      price: 0,
      category: "men",
      age: 0,
      psize: "XS",
      discount: 0,
      qty: 0,
      listed: true,
      listby: email,
      modifiedBy: email
  });
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/products');
        console.log(response.data) // Replace with your API endpoint
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/products');
      console.log(response.data) // Replace with your API endpoint
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleListing = async (id) =>{
    try{
      const response = await enlistProduct(id);
      if (response.status === 200){
        alert("Product listed successfully");
        fetchProducts();
      }
      else{
        alert("something went wrong");
      }
    }catch (error) {
      alert("something went wrong");
      console.error('Error updating product:', error);
    }
  }

  const handleUnlisting = async (id) =>{
    try{
      const response = await unlistProduct(id);
      if (response.status === 200){
        alert("Product unlisted successfully");
        fetchProducts();
      }
      else{
        alert("something went wrong");
      }
    }catch (error) {
      alert("something went wrong");
      console.error('Error updating product:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('product', new Blob([JSON.stringify(newProduct)], { type: 'application/json' }));
      if (file) {
          formData.append('img', file);
      }

      try {
          const response = await createProduct(formData);
          console.log('Product created:', response);
          setShowModal(false);
          setShowToast(true);
          fetchProducts();
      } catch (error) {
          console.error('Error creating product:', error.message);
      }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert('product deleted successfully');
      setProducts(products.filter(product => product.id !== id));
      fetchProducts();
    } catch (error) {
      alert('Error deleting product:', error);
    }
  };

  const handleEdit = async (id) => {
    const product = await getProductById(id);
    setSelectedProduct(product)
    setShowEditModal(true);
  };

  

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value);
    setFilteredProducts(products.filter(product =>
      product.pname.toLowerCase().includes(value) ||
      (product.category && product.category.toLowerCase().includes(value)) ||
      (product.premium ? 'yes' : 'no').includes(value) ||
      product.price.toString().includes(value) ||
      product.qty.toString().includes(value)
    ));
  };

  return (
    <>
    <h2>Product List</h2>
    <p>View and Manage Products in the database</p>
    <Container className='mt-4' fluid="md" style={{height:'70vh',overflowY:'hidden'}}>
      <Row>
        <Col md={7}>
        <InputGroup className="mb-3"style={{width:'50%'}}>
        <FormControl
          
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearch}
        />
      </InputGroup>
        </Col>
        <Col md={1}></Col>
        <Col md={4} style={{textAlign:"end"}}>
        <Button style={{width:'40%'}} variant="success" onClick={handleShow}>Add New Product</Button>{' '}
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Premium</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Listed By</th>
            <th>Is Listed?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.pname}</td>
              <td>{product.category}</td>
              <td>{product.premium?'yes':'no'}</td>
              <td>{product.price}</td>
              <td>{product.qty}</td>
              <td>{product.listby}</td>
              <td>{product.listed?'yes':'no'}</td>
              <td>
                <Button style={{width:'30%'}} variant="warning" onClick={() => handleEdit(product.id)}>Edit</Button>{' '}
                <Button style={{width:'35%'}} variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>{' '}
                {(product.listed)?
                <Button style={{width:'30%'}} variant="secondary" onClick={() => handleUnlisting(product.id)}>Unlist</Button>
                  :
                <Button style={{width:'30%'}} variant="primary" onClick={() => handleListing(product.id)}>Enlist</Button>

                }

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedProduct && (
                <UpdateProductModal
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    product={selectedProduct}
                />
            )}
      

      <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="pname"
                                        value={newProduct.pname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductPremium">
                                    <Form.Label>Premium</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="premium"
                                        value={newProduct.premium}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="category"
                                        value={newProduct.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kids</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={newProduct.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductSize">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="psize"
                                        value={newProduct.psize}
                                        onChange={handleChange}
                                        required
                                    >
                                        {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Free Size'].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductDiscount">
                                    <Form.Label>Discount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="discount"
                                        value={newProduct.discount}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formProductQty">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="qty"
                                        value={newProduct.qty}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formProductImg">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="img"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Form.Control type="hidden" name="listed" value={true} />

                        <Form.Group className="mb-3" controlId="formProductListBy">
                            <Form.Label>Listed By</Form.Label>
                            <Form.Control
                                type="text"
                                name="listby"
                                value={newProduct.listby}
                                onChange={handleChange}
                                required
                                readOnly
                                plaintext
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductModifiedBy">
                            <Form.Label>Modified By</Form.Label>
                            <Form.Control
                                type="text"
                                name="modifiedBy"
                                value={newProduct.modifiedBy}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
  <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={1000}
        autohide
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Product uploaded successfully!</Toast.Body>
      </Toast>
    </Container>
    </>
    
  );
};

export default ProductScreen;

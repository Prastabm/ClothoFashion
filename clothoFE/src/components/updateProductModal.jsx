import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateProduct } from '../service/productAPI';


const UpdateProductModal = ({ show, handleClose, product }) => {
    const [file, setFile] = useState(null);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [formData, setFormData] = useState({
        pname: product.pname,
        premium: product.premium,
        price: product.price,
        category: product.category,
        age: product.age,
        psize: product.psize,
        discount: product.discount,
        qty: product.qty,
        listed: product.listed,
        listby: product.listby,
        modifiedBy: user.email
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'img') {
            setFormData({
                ...formData,
                [name]: e.target.files[0] || null
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append the product data as a JSON string with the key "product"
        form.append('product', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

        // Append the image file with the key "img"
        if (file) {
            form.append('img', file);
        }

        try {
            const response = await updateProduct(product.id, form);
            console.log('Product updated:', response);
            handleClose();
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPname">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="pname"
                            value={formData.pname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* ... other form fields ... */}
                    <Form.Group controlId="formPremium">
                        <Form.Check
                            type="checkbox"
                            label="Premium"
                            name="premium"
                            checked={formData.premium}
                            onChange={() => setFormData({ ...formData, premium: !formData.premium })}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPsize">
                        <Form.Label>Product Size</Form.Label>
                        <Form.Control
                            type="text"
                            name="psize"
                            value={formData.psize}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDiscount">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formQty">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="qty"
                            value={formData.qty}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formImg">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="img"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formListed">
                        <Form.Check
                            type="checkbox"
                            label="Listed"
                            name="listed"
                            checked={formData.listed}
                            onChange={() => setFormData({ ...formData, listed: !formData.listed })}
                        />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateProductModal;
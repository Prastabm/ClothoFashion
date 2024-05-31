import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Row, Col, Modal } from 'react-bootstrap';
import { deleteUser, getAllAgents, promoteAgent } from '../service/userAPI';
import { addUser } from '../service/userAPI';
const AgentScreen = () => {
  const [agents, setAgents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [addModal, setAddModal] = useState(false);

  
    
    const [user, setUserData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role:'agent',
      name: '',
      address: '',
      city: '',  
      postalCode: '' 
    });
    const [error, setError] = useState('');
  useEffect(() => {
    fetchAgentsAndAdmins();
  }, []);

  const fetchAgentsAndAdmins = async () => {
    await fetchAgents();
    await fetchAdmins();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...user, [name]: value });
  };
  const fetchAgents = async () => {
    try {
      const response = await getAllAgents("Agent");
      console.log('Agents:', response);
      setAgents(response);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };
  

  const addUserDetails = async () => {
    const address = `${user.address}, ${user.city} - ${user.postalCode}`;
    const newUser = { ...user, address };
    return await addUser(newUser);
  };
  const fetchAdmins = async () => {
    try {
      const response = await getAllAgents("Admin");
      console.log('Admins:', response);
      setAdmins(response);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handlePromote = async (id) => {
    try {
      const response = await promoteAgent(id);
      if (response.status === 200) {
        alert('Agent promoted');
        await fetchAgentsAndAdmins();
      } else {
        alert('Failed to promote agent');
        
      }
    } catch (error) {
      alert('Something went wrong');
      console.error('Error promoting agent:', error);
    }
  };
  const handleAddModal = () => setAddModal(true);
  const handleClose = () => setAddModal(false);

  const handleDelete = async(id) =>{
    try{
      await deleteUser(id);
      alert('Agent deleted successfully');
      fetchAgents();
    }catch(error){
      alert('something went wrong');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUserDetails();
      alert('agent added successfully');
      fetchAgentsAndAdmins();
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data);
      } else {
        setError('User exists!');
      }
    }
  };
  return (
    <div>
      <h2>Agents & Admins Page</h2>
      
      
      <Container className='mt-4' fluid="md">
      <Row className='mb-3'>
        <Col md={8}>
        <h4>Agents</h4>
        </Col>
        <Col style={{textAlign:'end'}} md={4}>
          <Button style={{width:'40%'}} variant='success' onClick={handleAddModal}>Add new Agent</Button>
        </Col>
      </Row>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Agent Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.id}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.address}</td>
                <td>
                  <Button style={{width:'30%'}} className='me-2' variant="outline-danger" onClick={()=> handleDelete(agent.id)}>Delete</Button>
                  <Button style={{width:'30%'}} className='me-2' variant="outline-primary" onClick={() => handlePromote(agent.id)}>Promote</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4>Admins</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Admin Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal show={addModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
                    <Modal.Title>Add New Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="registerForm" onSubmit={handleSubmit}>
       
        <table>
          <tbody>
            <tr>
              <td colSpan="3">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter a username"
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email id"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a password"
                  required
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter street name"
                  required
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter city"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
            <td>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Enter postal code"
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        
        <br></br>
        <button type="submit">REGISTER</button>
        {error && <div className="error-message">{error}</div>}
      </form>
                </Modal.Body>
      </Modal>
    </div>
  );
};

export default AgentScreen;

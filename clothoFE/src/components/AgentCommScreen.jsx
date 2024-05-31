import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { sendReply, getMessageById, getRepliedMessagesByLocation, getUnrepliedMessagesByLocation } from '../service/commAPI';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { deleteMessage } from '../service/commAPI';

export const AgentCommScreen = () => {
    const[repliedMessages, setRepliedMessages] = useState([]);
    const[totalrepliedMessages, setTotalRepliedMessages] = useState(0);
    const[totalUnrepliedMessages, setTotalUnRepliedMessages] = useState(0);
    const[unRepliedMessages, setUnRepliedMessages] = useState([]);
    const[selectedMessage, setSelectedMessage] = useState(null);
    const[showMessageModal, setShowMessageModal] = useState(false);
    const[replyModal, setReplyModal] = useState(false);
    const [formData, setFormData] = useState({
      to: '',
      subject: 'Thank You For Contacting Clotho',
      body: ''
    });
    const user = JSON.parse(sessionStorage.getItem('user'));
  
    useEffect(()=>{
      const fetchRepliedMessages = async ()=>{
        try{
          const response = await getRepliedMessagesByLocation(user.address);
          setRepliedMessages(response);
          setTotalRepliedMessages(response.length);
        }catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
      const fetchUnrepliedMessages = async ()=>{
        try{
          const response = await getUnrepliedMessagesByLocation(user.address);
          setUnRepliedMessages(response);
          setTotalUnRepliedMessages(response.length);
        }catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
  
      fetchRepliedMessages();
      fetchUnrepliedMessages();
    },[]);
    const fetchRepliedMessages = async ()=>{
        try{
          const response = await getRepliedMessagesByLocation(user.address);
          setRepliedMessages(response);
          setTotalRepliedMessages(response.length);
        }catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    console.log(totalUnrepliedMessages);
    console.log(totalrepliedMessages);
    const handleCloseMessageModal = () =>{
      setShowMessageModal(false);
      setSelectedMessage(null);
  }
  const handleCloseReplyModal = () =>{
    setReplyModal(false);
    setSelectedMessage(null);
  }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(JSON.stringify(formData, null, 2)); // Log the JSON object to the console
      // Here you can also send the JSON to an API endpoint using fetch or axios
      const response =await sendReply(selectedMessage.id,JSON.stringify(formData));
      if(response!=null){
        alert("reply sent");
        handleCloseReplyModal();
      }
      else{alert("something went wrong")}
    };
    const handleReplyModal = async (id) => {
      try{
        const message = await getMessageById(id);
        console.log(message);
        setSelectedMessage(message);
        setReplyModal(true);
      }catch (error) {
        console.error('Error fetching message details:', error);
      }
    }

    const handleDelete = async(id) =>{
        try{
          await deleteMessage(id);
          alert('Message deleted successfully');
          fetchRepliedMessages();
        }catch(error){
          alert('something went wrong');
        }
      }
    const handleViewMessage = async (id) => {
        try{
            const message = await getMessageById(id);
            console.log(message);
            setSelectedMessage(message);
            setShowMessageModal(true);
        }catch (error) {
            console.error('Error fetching message details:', error);
          }

    };
    
    return (
      <div>
        <h2>Communications</h2>
        <Container className='mt-5' fluid>
          <Row >
            <Col md={6} >
              <h4>Unreplied Messages: {totalUnrepliedMessages}</h4>
              <div style={{overflowY:'auto', height:'65vh'}}>
              {unRepliedMessages.map((message)=>(
                <Card 
                style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}
                className='mb-1 shadow-card'
                 key={message.id}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h6>{message.name}</h6>
                      <p>{message.email}</p>
                    </Col>
                    <Col md={4} style={{textAlign:'end'}} >
                      <Button title='View' onClick={() => handleViewMessage(message.id)} className='mt-2 ' style={{width:'25%'}}><i className="fa-solid fa-eye" style={{color: '#ffffff'}}></i></Button>{' '}
                      <Button className='mt-2 ' variant='success' onClick={() => handleReplyModal(message.id)}style={{width:'25%'}}><i className="fa-solid fa-comment-dots" style={{color: '#ffffff'}}></i></Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              ))}
              </div>
              
            </Col>
            <Col md={6}>
              <h4>Replied Messages: {totalrepliedMessages}</h4>
              <div style={{overflowY:'auto', height:'65vh'}}>
              {repliedMessages.map((message)=>(
                <Card 
                style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}
                className='mb-1 shadow-card'
                 key={message.id}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h6>{message.name}</h6>
                      <p>{message.email}</p>
                    </Col>
                    <Col md={4} style={{textAlign:'end'}} >
                      <Button className='mt-2 ' onClick={() => handleViewMessage(message.id)}style={{width:'25%'}}><i className="fa-solid fa-eye" style={{color: '#ffffff'}}></i></Button>{' '}
                      <Button className='mt-2 ' variant='danger' style={{width:'25%'}}onClick={()=> handleDelete(message.id)}><i className="fa-solid fa-trash" style={{color: '#ffffff'}}></i></Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              ))}
              </div>
            </Col>
          </Row>
        </Container>
        <Modal centered show={showMessageModal} onHide={handleCloseMessageModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
                {selectedMessage?(
                    <Modal.Body>
                        <h3>{selectedMessage.name}</h3>
                        <p>{selectedMessage.email}, {selectedMessage.location}</p>
                        <br></br>
                        <h5>{selectedMessage.type}</h5>
                        <p>{selectedMessage.message}</p>
                        <p><span style={{fontWeight:'bold'}}>Replied: </span>
                        {(selectedMessage.replied)?
                        <span style={{color:'green'}}>Yes</span>:
                        <span style={{color:'red'}}>No</span>
                        }
                        </p>
                        <p><span style={{fontWeight:'bold'}}>Replied By: </span>
                        {selectedMessage.repliedby}
                        </p>

                    </Modal.Body>
                )
                    :
                    (<Modal.Body>Loading...</Modal.Body>)
                }
                <Modal.Footer>
                <Container fluid>
            <Row>
              <Col xs={6}>
                <Button variant="secondary" onClick={handleCloseMessageModal} style={{ width: '100%' }}>
                  Close
                </Button>
              </Col>
              <Col xs={6}>
                {selectedMessage && (
                  (selectedMessage.replied)?
                  <Button
                    variant="danger"
                    style={{ width: '100%' }}
                  >
                    Delete
                  </Button>:
                  <Button
                  onClick={() => handleReplyModal(selectedMessage.id)}
                  variant="success"
                  style={{ width: '100%' }}
                >
                  Reply
                </Button>
                )}
              </Col>
            </Row>
          </Container>
                </Modal.Footer>
        </Modal>
        <Modal centered show={replyModal} onHide={handleCloseReplyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formTo">
          <Form.Label column sm={2}>To</Form.Label>
          <Col sm={10}>
          <Form.Control
      type="email"
      name="to"
      value={ formData.to}
      // Add the readOnly attribute here
      onChange={handleChange}
      placeholder="Enter recipient email"
      required
    />

          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formSubject">
          <Form.Label column sm={2}>Subject</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBody">
          <Form.Label column sm={2}>Body</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={5}
              placeholder="Enter message body"
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
        </Modal.Body>
        </Modal>
      </div>
    )
}
export default AgentCommScreen;
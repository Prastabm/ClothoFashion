import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import './styles.css';
import collapse from '../assets/collapse.png';
import expand from '../assets/expand.png';
import dashboard from '../assets/dashboard.png';
import productNav from '../assets/productNav.png';
import commNav from '../assets/commNav.png';

const AgentSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <Button 
        variant="success" 
        className={isExpanded ? "toggle-button" : "toggle-button-collapsed ps-1"} 
        onClick={toggleSidebar}
      >
        <img 
          src={isExpanded ? collapse : expand} 
          alt={isExpanded ? 'collapse' : 'expand'} 
          style={isExpanded ? { height: '16px' } : { marginRight: '6px' }}
        />
      </Button>
      <Nav className="flex-column">
        <Nav.Link 
          title='dashboard'
          className='navbar-link'
          style={{ textAlign: "center", color: "white" }} 
          as={Link} 
          to="/agent-dashboard"
        >
          <img
            src={dashboard}
            alt='dashboard_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}> Dashboard</span>}
        </Nav.Link>
        
        <Nav.Link 
        title='products'
        className='navbar-link'
          style={{ textAlign: "center" , color: "white" }} 
          as={Link} 
          to="/agent-products"
        >
          <img
            src={productNav}
            alt='product_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}>Products</span> }
        </Nav.Link>
       
      
      <Nav.Link 
        title='communications'
        className='navbar-link'
          style={{ textAlign: "center" , color: "white" }} 
          as={Link} 
          to="/agent-communication"
        >
          <img
            src={commNav}
            alt='product_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}>Communications</span> }
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AgentSidebar;

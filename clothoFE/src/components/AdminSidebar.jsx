import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import './styles.css';
import collapse from '../assets/collapse.png';
import expand from '../assets/expand.png';
import dashboard from '../assets/dashboard.png';
import productNav from '../assets/productNav.png';
import agentNav from '../assets/agentNav.png';
import ordersNav from '../assets/ordersNav.png';
import commNav from '../assets/commNav.png';

const Sidebar = () => {
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
          className='navbar-link'
          style={{ textAlign: "center", color: "white" }} 
          as={Link} 
          to="/dashboard"
        >
          <img
            src={dashboard}
            alt='dashboard_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}> Dashboard</span>}
        </Nav.Link>
    
        <Nav.Link 
        className='navbar-link'
          style={{ textAlign: "center", color: "white" }} 
          as={Link} 
          to="/agents"
        >
          <img
            src={agentNav}
            alt='product_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}>Agents</span>}
        </Nav.Link>
        <Nav.Link 
        className='navbar-link'
          style={{ textAlign: "center" , color: "white" }} 
          as={Link} 
          to="/products"
        >
          <img
            src={productNav}
            alt='product_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}>Products</span> }
        </Nav.Link>
        <Nav.Link 
        className='navbar-link'
          style={{ textAlign: "center" , color: "white" }} 
          as={Link} 
          to="/orders"
        >
          <img
            src={ordersNav}
            alt='product_icon'
            style={{ height: '20px' }}
          />
          {isExpanded && <span style={{marginLeft:'0.5rem'}}>Orders</span> }
        </Nav.Link>
      
      <Nav.Link 
        className='navbar-link'
          style={{ textAlign: "center" , color: "white" }} 
          as={Link} 
          to="/communications"
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

export default Sidebar;

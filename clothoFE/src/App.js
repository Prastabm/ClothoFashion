import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminSidebar from './components/AdminSidebar';
import Dashboard from './components/Dashboard';
import ProductScreen from './components/ProductScreen';
import AgentScreen from './components/AgentScreen';
import AdminNavbar from './components/AdminNavbar';
import Communications from './components/Communications';
import OrdersPage from './components/OrdersPage';
import Login from './components/Login';
import AgentDashboard from './components/AgentDashboard';
import HomePage from './components/HomePage';
import  AboutUsPage from './components/AboutUsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserNavbar from './components/UserNavbar';
import AgentSidebar from './components/AgentSidebar';
import AgentNavbar from './components/AgentNavbar';
import Register from './components/Register'; // Include register component if needed
import WishlistPage from './components/WishlistPage';
import AgentProductScreen from './components/AgentProductScreen';
import AgentCommScreen from './components/AgentCommScreen';
import WishList from './components/WishList';
import EditProfile from './components/EditProfile';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderSummary from './components/OrderSummary';
import UserOrdersPage from './components/UserOrdersPage';
import ForgotPassword from './components/ForgotPassword';


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    setUser(userData);  // Fetch user data from sessionStorage on mount
  }, []);  // Empty dependency array to run only on initial mount

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };

  let NavbarComponent;
  let SidebarComponent;

  if (user) {
    switch (user.role.toLowerCase()) {
      case 'admin':
        NavbarComponent = <AdminNavbar onLogout={handleLogout} userId={user.id}/>;
        SidebarComponent = <AdminSidebar />;
        break;
      case 'agent':
        NavbarComponent = <AgentNavbar onLogout={handleLogout} userId={user.id}/>;
        SidebarComponent = <AgentSidebar />;
        break;
      case 'user':
        NavbarComponent = <UserNavbar onLogout={handleLogout} />;
        SidebarComponent = null;
        break;
      default:
        NavbarComponent = null;
        SidebarComponent = null;
    }
  }

  return (
    <Router>
      {NavbarComponent}
      <div style={{ display: 'flex' }}>
        {SidebarComponent}
        <div style={{ marginLeft: '60px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />

            {/* Login Routes */}
            <Route path="/dashboard" element={<ProtectedRoute role="Admin" element={Dashboard} />} />
            <Route path="/agent-dashboard" element={<ProtectedRoute role="agent" element={AgentDashboard} />} />
            <Route path="/user-homepage" element={<ProtectedRoute role="user" element={HomePage} />} />

            {/* Admin Routes */}
            <Route path="/dashboard" element={<ProtectedRoute role="Admin" element={Dashboard} />} />
            <Route path="/communications" element={<ProtectedRoute role="Admin" element={Communications} />} />
            <Route path="/orders" element={<ProtectedRoute role="Admin" element={OrdersPage} />} />
            <Route path="/products" element={<ProtectedRoute role="Admin" element={ProductScreen} />} />
            <Route path="/agents" element={<ProtectedRoute role="Admin" element={AgentScreen} />} />
            <Route path="/edit-profile/:userId"  element={<ProtectedRoute role="Admin" element={EditProfile } />} /> 

            {/* User Routes */}
            <Route path="/wishlist" element={<ProtectedRoute role="user" element={WishList} />} /> 
            <Route path="/user/edit-profile/:userId"  element={<ProtectedRoute role="user" element={EditProfile } />} /> 
            <Route path="/cart"  element={<ProtectedRoute role="user" element={CartPage} />} /> 
            <Route path="/checkout"  element={<ProtectedRoute role="user" element={CheckoutPage} />} /> 
            <Route path="/order-confirmation"  element={<ProtectedRoute role="user" element={OrderSummary} />} /> 
            <Route path="/user-orders-page"  element={<ProtectedRoute role="user" element={UserOrdersPage} />} /> 

            {/* Agent Routes */}
            <Route path="/agent-products" element={<ProtectedRoute role="agent" element={AgentProductScreen} />} />
            <Route path="/agent-communication" element={<ProtectedRoute role="agent" element={AgentCommScreen} />} />
            <Route path="/agent/edit-profile/:userId"  element={<ProtectedRoute role="agent" element={EditProfile } />} /> 



            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

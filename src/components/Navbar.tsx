import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  ShoppingBag,
  MessageCircle,
  Video,
  Search,
  ShoppingCart,
  User,
  Menu,
  LogIn,
  LogOut,
  Settings,
  UserCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import './Navbar.css';

// Mock products data - replace with your actual products data
const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <div className="brand">
          <img src="/public/images/logo.png" alt="Eco Farm" />
          <h1>Eco Farm</h1>
        </div>

        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/products">PRODUCTS</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/tutorials">TUTORIALS</Link>
        </div>

        <div className="nav-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
            />
            <Search className="search-icon" />
          </div>

          <div className="cart-container" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </div>

          {isAuthenticated ? (
            <div className="profile-container">
              <button 
                className="profile-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <UserCircle className="user-icon" />
              </button>
              
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <UserCircle className="profile-avatar" />
                    <div className="profile-info">
                      <p className="profile-name">{user?.name || 'User'}</p>
                      <p className="profile-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="profile-menu">
                    <Link to="/profile" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link to="/settings" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <button onClick={handleLogout} className="profile-item logout">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="auth-button">
              <LogIn className="login-icon" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        {/* Top Bar */}
        <div className="mobile-header">
          <div className="brand">
            <img src="/public/images/logo.png" alt="Eco Farm" />
            <h1>Eco Farm</h1>
          </div>

          <div className="header-actions">
            <div className="cart-container" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </div>
            <Menu 
              className="menu-icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mobile-search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
            />
            <Search className="search-icon" />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <Link to="/" className="nav-item">
            <Home />
            <span>Home</span>
          </Link>
          <Link to="../pages/product/product.tsx" className="nav-item">
            <ShoppingBag />
            <span>Products</span>
          </Link>
          <Link to="/tutorials" className="nav-item">
            <Video />
            <span>Tutorials</span>
          </Link>
          <Link to="../pages/ContactPage/ContactPage.tsx" className="nav-item">
            <MessageCircle />
            <span>Contact</span>
          </Link>
          {isAuthenticated ? (
            <button 
              className="nav-item"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <UserCircle />
              <span>Profile</span>
            </button>
          ) : (
            <Link to="/auth" className="nav-item">
              <LogIn />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="menu-overlay">
            <div className="menu-content">
              <div className="menu-header">
                <h2>Menu</h2>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="close-button"
                >
                  ✕
                </button>
              </div>
              <div className="menu-items">
                {isAuthenticated && (
                  <>
                    <div className="mobile-profile-header">
                      <UserCircle className="mobile-profile-avatar" />
                      <div className="mobile-profile-info">
                        <p className="mobile-profile-name">{user?.name || 'User'}</p>
                        <p className="mobile-profile-email">{user?.email}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="mobile-logout-button">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        products={mockProducts}
      />
    </>
  );
};

export default Navbar;
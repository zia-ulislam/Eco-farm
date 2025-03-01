import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Truck } from 'lucide-react';
import './styles.css';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    location: '',
    city: '',
    district: '',
    postalCode: '',
  });

  // State for products data
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products data on component mount
  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Ensure IDs are strings
        const updatedData = data.map((product: Product) => ({
          ...product,
          id: String(product.id),
        }));
        setProducts(updatedData);
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  }, []);

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.product_id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.phone ||
      !formData.location ||
      !formData.city ||
      !formData.district ||
      !formData.postalCode
    ) {
      alert('Please fill out all fields.');
      return;
    }

    // Log the order details (replace this with actual backend API call)
    console.log('Order submitted:', { formData, cart });

    // Redirect to home page after successful submission
    navigate('/');
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Shipping Information Section */}
          <div className="form-section">
            <h2>Shipping Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Address</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="form-section">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map(item => {
                  const product = products.find(p => p.id === item.product_id);
                  if (!product) return null;

                  return (
                    <div key={item.product_id} className="order-item">
                      <img src={product.image} alt={product.name} />
                      <div className="item-details">
                        <h3>{product.name}</h3>
                        <p className="quantity">Quantity: {item.quantity}</p>
                        <p className="price">${(product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            <Truck className="truck-icon" />
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartContext';
import axios from 'axios';
import './Cart.css';
import empty from '../../Assets/Images/empty.png';

export default function Cart() {
  const { cart, updateCart, removeFromCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    async function fetchProductDetails() {
      setIsLoading(true); 
      const productDetails = await Promise.all(
        cart.map(item =>
          axios.get(`https://fakestoreapi.com/products/${item.productId}`)
        )
      );
      setProducts(productDetails.map(res => res.data));
      setIsLoading(false); 
    }

    if (cart.length > 0) {
      fetchProductDetails();
    } else {
      setIsLoading(false);
    }
  }, [cart]);

  const calculateTotalPrice = () => {
    const total = cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);

    return (total - discount).toFixed(2); 
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    updateCart(updatedCart); 
  };

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10);
      alert('Coupon applied: $10 discount!');
    } else {
      alert('Invalid coupon code.');
      setDiscount(0); 
    }
  };

  if (isLoading) {
    return (
      <div className="loading-page">
        <i className="fas fa-spin fa-spinner fa-5x"></i>
      </div>
    );
  }

  if (cart.length === 0 || products.length === 0) {
    return <div className='emptiness'>
      <img src={empty} alt="" />
    </div>;
  }

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <img className='empty-cart' src={empty} alt="" />
      ) : (
        <>
          <div className="cart-products">
            {cart.map((cartItem, index) => {
              const product = products.find(p => p.id === cartItem.productId); 

              if (!product) return null; 

              return (
                <div key={index} className="cart-row">
                  <div className="image-cart-container">
                    <img className="w-100" src={product.image} alt={product.title} />
                  </div>

                  <div className="title-products">
                    <h4>{product.title}</h4>
                    <p>
                      ${(product.price * cartItem.quantity).toFixed(2)} (${product.price.toFixed(2)} / per item)
                    </p>
                  </div>

                  <div className="counter-price-info">
                    <select
                      value={cartItem.quantity}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="delete-section">
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => removeFromCart(cartItem.productId)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="coupon-section">
              <h4>Have coupon?</h4>
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)} 
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>

            <div className="price-breakdown">
              <div className="summary-row">
                <span>Total price:</span>
                <span>${calculateTotalPrice()}</span>
              </div>

              <button className="checkout-btn">Make Purchase</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

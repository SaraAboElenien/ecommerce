import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

 async function addToCart(productId, quantity) {
  try {
    const response = await axios.post('https://fakestoreapi.com/carts', {
      userId: 5,
      date: new Date().toISOString(),
      products: [{ productId, quantity }],
    });
    
    const newCartItem = response.data;
    setCart((prevCart) => [...prevCart, ...newCartItem.products]);

    toast.success('Product added to cart successfully', {
      duration: 4000,
      position: 'top-center',
    });

  } catch (error) {
    console.error('Failed to add to cart', error);
    toast.error('Failed to add product to cart');
  }
}

 async function fetchCart() {
  try {
    const response = await axios.get('https://fakestoreapi.com/carts/user/5');
    setCart(response.data[0]?.products || []);
  } catch (error) {
    console.error('Failed to fetch cart data', error);
  }
}

 useEffect(() => {
  fetchCart();
}, []);    

const updateCart = (updatedCart) => {
  setCart(updatedCart);
};

const removeFromCart = (productId) => {
  setCart(cart.filter(item => item.productId !== productId));
};



  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

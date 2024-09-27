import React, { useState } from "react";
import "./Navbar.css";
import Logo from '../../Assets/Images/Logo.png';
import { Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext'; 

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  
  const { cartQuantity } = useCart(); 

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    setOpenNav(false);
  };

  const openNavMenu = () => {
    setOpenNav(true);
    setOpenSearch(false);
  };

  const closeNavMenu = () => {
    setOpenNav(false);
  };

  return (
    <nav className={`nav ${openNav ? "openNav" : ""} ${openSearch ? "openSearch" : ""}`}>
      <i className="fa-solid fa-bars navOpenBtn" onClick={openNavMenu}></i>
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
        Luxora
      </Link>
      <ul className="nav-links">
        <i className=" fa-solid fa-xmark navCloseBtn" onClick={closeNavMenu}></i>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <Link to="/cart" className="cart-icon-container">
        <i className="fa-solid fa-cart-shopping search-icon"></i>
        {cartQuantity > 0 && (
          <span className="cart-badge">{cartQuantity}</span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;

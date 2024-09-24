import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
    <section className="AboveFooter">
      <div className="AboveFooter-row">

        <div className="AboveFooter-col">
            <div className="footer-icon">
            <i class="fa-solid fa-trophy"></i>
            </div>
            <div className="content-footer">
                <h4>High Quality</h4>
                <p>crafted from top materials</p>
            </div>
        </div>
  

        <div className="AboveFooter-col">
            <div className="footer-icon">
            <i class="fa-regular fa-circle-check"></i>            </div>
            <div className="content-footer">
                <h4>Warranty Protection</h4>
                <p>Over 2 years</p>
            </div>
        </div>
        <div className="AboveFooter-col">
            <div className="footer-icon">
            <i class="fa-solid fa-hand-holding-heart"></i>            </div>
            <div className="content-footer">
                <h4>Free Shipping</h4>
                <p>Order over 150 $</p>
            </div>
        </div>
        <div className="AboveFooter-col">
            <div className="footer-icon">
            <i class="fa-solid fa-headset"></i>            </div>
            <div className="content-footer">
                <h4>24 / 7 Support</h4>
                <p>Dedicated support</p>
            </div>
        </div>



      </div>
    </section>



        <section className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h4>Info</h4>
          <ul className="links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Compressions</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Collection</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="links">
            <li><a href="#">Free Products</a></li>
            <li><a href="#">Latest Designs</a></li>
            <li><a href="#">Brands</a></li>
            <li><a href="#">Popular Products</a></li>
            <li><a href="#">Art Skills</a></li>
            <li><a href="#">New Products</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="links">
            <li><a href="#">Customer Agreement</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">GDPR</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Our Clients</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose of news, updates, helpful tips, and exclusive offers.
          </p>
          <form action="#">
            <input type="email" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className="icons">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-github"></i>
          </div>
        </div>
      </div>
    </section>
</>
  );
};

export default Footer;

import React from 'react';
import './AboveFooter.css';

const AboveFooter = () => {
  return (
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
  );
};

export default AboveFooter;

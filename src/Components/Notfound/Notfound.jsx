import React from 'react';
import './Notfound.css';
import error from '../../Assets/Images/5701571.webp'
export default function Notfound() {
  return <>
  <div className="error">
    <img src={error} alt=""  />
  </div>
  </>
}

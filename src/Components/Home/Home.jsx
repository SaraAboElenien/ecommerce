import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import jewelery from '../../Assets/Images/Jewellery.webp';
import clothes from '../../Assets/Images/clothes.jpg';
import stone from '../../Assets/Images/OAW22FIJJS107.webp';
import elec from '../../Assets/Images/elec.jpg';
import brand from '../../Assets/Images/brand.jpg';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  async function getCategories() {
    setIsLoading(true); 
    try {
      let { data } = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching categories', error);
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-header"></div>

        <section className='home-section'>
          <h2 className="section-title">Categories</h2>

          {isLoading ? ( 
            <div className="loading-page">
              <i className="fas fa-spin fa-spinner fa-5x"></i>
            </div>
          ) : (
            <div id="category-row">
              {categories.map((category, index) => (
                <div key={index} className='category-info'>
                  <img
                    src={getImageForCategory(category)} 
                    alt={category}
                    className='category-img'
                  />
                  <h4 className='category-title'>{category}</h4>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function getImageForCategory(category) {
  switch(category) {
    case 'electronics':
      return elec;
    case 'jewelery':
      return stone;
    case "men's clothing":
      return brand;
    default:
      return jewelery;
  }
}

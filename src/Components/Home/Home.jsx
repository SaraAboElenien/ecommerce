import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import pic1 from '../../Assets/Images/pic1.jpg';
import pic2 from '../../Assets/Images/pic2.jpg';
import pic3 from '../../Assets/Images/pic3.jpg';
import pic6 from '../../Assets/Images/pic6.jpg';
import pic7 from '../../Assets/Images/pic7.jpg';
import clothesRack from '../../Assets/Images/pic5.jpg';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const testimonials = [
    {
      author: 'Julie Rosie',
      picture: 'https://cdn.easyfrontend.com/pictures/testimonial/testimonial_11.webp',
      rating: 4.5,
      description: 'When it comes to booking a holiday, we know everyone likes something different - so we\'ve designed our getaways with you in mind.',
    },
    {
      author: 'Raima Sen',
      picture: pic7,
      rating: 4,
      description: 'When it comes to booking a holiday, we know everyone likes something different - so we\'ve designed our getaways with you in mind.',
    },
    {
      author: 'Michael Woods',
      picture: pic6,
      rating: 5,
      description: 'We provide great holidays with amazing prices, ideal for all types of travelers. Your satisfaction is our priority.',
    },
  ];

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products/categories");
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

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((currentIndex + 1) % testimonials.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
    };
  
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
          stars.push(<span key={i} className="star filled">★</span>);
        } else if (i === Math.ceil(rating)) {
          stars.push(<span key={i} className="star half">★</span>);
        } else {
          stars.push(<span key={i} className="star">★</span>);
        }
      }
      return stars;
    };

    return (
      <div className="testimonial-slider">
        <h2 className="slider-title">Community Reviews</h2>

        <div className="testimonial-content">
          <div className="testimonial-image">
            <img src={testimonials[currentIndex].picture} alt={testimonials[currentIndex].author} />
          </div>
          <div className="testimonial-text">
            <h3>{testimonials[currentIndex].author}</h3>
            <div className="testimonial-stars">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            <p>{testimonials[currentIndex].description}</p>
          </div>
        </div>

        <div className="slider-controls">
          <button className="prev-btn" onClick={handlePrev}>‹</button>
          <button className="next-btn" onClick={handleNext}>›</button>
        </div>
      </div>
    );
  };

  // Loader Component
  const Loader = () => (
    <div className="loading-page">
      <i className="fas fa-spin fa-spinner fa-5x"></i>
    </div>
  );

  return (
    <div className="home-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="home-header"></div>
          <div className="contain">
            <div className="ima-container">
              <img className='grow' src={clothesRack} alt="Clothes Rack" />
            </div>
            <div className="text-container">
              <h1>Luxury and Urban Fashion Brands</h1>
              <p><span className="highlight">15+</span> we have supplied all over the world</p>
              <p><span className="highlight">90+</span> Have been working very gratefully</p>
              <p><span className="highlight">8M</span> Received products very cordially</p>
            </div>
          </div>

          <section className='home-section'>
          <h2 className="slider-title">Categories</h2>

            <div className="categories">
              {categories.map((category, index) => (
                <div key={index} className="category bounce-in">
                  <img
                    src={getImageForCategory(category)}
                    alt={category}
                    className='category-img'
                  />
                  <button className="category-btn"
                    onClick={() => handleCategoryClick(category)}>{category}</button>
                </div>
              ))}
            </div>
          </section>

          <TestimonialSlider />
        </>
      )}
    </div>
  );
}

function getImageForCategory(category) {
  switch (category) {
    case 'electronics':
      return pic1;
    case 'jewelery':
      return pic3;
    case "men's clothing":
      return pic2;
    default:
      return pic2; 
  }
}

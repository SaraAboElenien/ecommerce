import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { useCart } from '../../Context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState({});
    const [size, setSize] = useState('Large');
    const { addToCart } = useCart(); 


    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    const handleAddToCart = () => {
        addToCart(product.id, quantity); 
      };


    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details", error);
            }
            setIsLoading(false)
        };

        fetchProductDetails();
    }, [id]);


    return (<>
 {isLoading ? (
        <div className="loading-page">
            <i className="fas fa-spin fa-spinner fa-5x"></i>

        </div>
      ) : (
        <div className="product-details">
            <div className="details-image-wrapper">
                <img src={product.image} alt={product.title} />
            </div>

            <div className="details-allinfo">
                <h2>{product.title}</h2>
                <span>
                    <i className="fas fa-star rating-color"></i>
                    <i className="fas fa-star rating-color"></i><i className="fas fa-star rating-color"></i>
                    <i class="fa-solid fa-star-half-stroke rating-color"></i>
                    <i class="fa-regular fa-star rating-color"></i>
                    {product.rating.rate}
                </span>
                <p className='price-product'>${product.price}</p>
                <p className='pro-dis'>{product.description}</p>

                <div className="buttttons">
                    <div className="product-size">
                        <label htmlFor="size">Pick Your Size:</label>
                        <select
                            id="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="size-select"
                        >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="X-Large">X-Large</option>
                        </select>
                    </div>

                    <div className="product-quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <div className="quantity-controls">
                            <button onClick={() => handleQuantityChange('decrement')}>-</button>
                           <span className='qualityspan' >{quantity}</span>
                            <button onClick={() => handleQuantityChange('increment')}>+</button>
                        </div>
                    </div>
                </div>
                <div className="product-actions">
                    <button className="buy-now">BUY NOW</button>
                    <button className="add-to-cart rating-color"  onClick={handleAddToCart} >
                        <i class="fa-solid fa-cart-plus"></i></button>
                    <button className="save"><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>
)}
</>
    );
};

export default ProductDetails;

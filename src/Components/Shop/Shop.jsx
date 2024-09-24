import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shop.css';
import toast from 'react-hot-toast';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const productsPerPage = 12;

  async function getProducts() {
    setIsLoading(true); 
    try {
      let { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products", error);
      toast.error("Failed to load products");
    }
    setIsLoading(false); 
  }

  useEffect(() => {
    getProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-shop">
      <ProductGrid products={currentProducts} isLoading={isLoading} /> 
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export const ProductGrid = ({ products, isLoading }) => {
  const { addToCart } = useCart();

  return (
    <>
      {isLoading ? (
        <div className="loading-page">
          <i className="fas fa-spin fa-spinner fa-5x"></i>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card product" key={product.id}>
              <div className="image-container">
                <div className="wrapper">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
              <div className="product-info">
                <h5 className="text-main">{product.category}</h5>
                <h4>{product.title.split(" ").slice(0, 4).join(" ")}</h4>
                <p className="info-paragraph">
                  <span>${product.price} </span>
                  <span>
                    <i className="fas fa-star rating-color me-1"></i>
                    {product.rating.rate}
                  </span>
                </p>
              </div>
              <div className="layer">
                <div className="layout-icons">
                  <span onClick={() => addToCart(product.id, 1)}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </span>
                  <span>
                    <Link to={`/product/${product.id}`}>
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

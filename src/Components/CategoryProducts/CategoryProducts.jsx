import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../Shop/Shop';
import Pagination from '../Shop/Shop';
import './CategoryProducts.css';

export default function CategoryProducts() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const productsPerPage = 12;

    useEffect(() => {
        async function fetchCategoryProducts() {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching category products", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategoryProducts();
    }, [categoryName]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="category-products-container">
            <h2 className='slider-title'>This is {categoryName}</h2>
            <ProductGrid products={currentProducts} isLoading={isLoading} />
            <div className="information-wrap">
            <h2 className='slider-title'>All  
                our products!</h2>
            <span className='hjg'><i class="fa-solid fa-arrow-down"></i></span>
            </div>
            <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
        </div>
    );
}

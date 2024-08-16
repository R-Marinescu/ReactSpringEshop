import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreItem from './StoreItem';
import { useProductContext } from '../context/ProductContext';

interface ProductListCategoryProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ProductListCategory = ({ category }: ProductListCategoryProps) => {
    const { products, error } = useProductContext();

    if(error) {
        return <div>Error: {error}</div>
    }

    const filteredProducts = products.filter(product => product.category === category);

    return (
        <>
            <h2>{category} Products</h2>
            <Row md={2} xs={1} lg={3} className="g-3">
                {filteredProducts.map(product => (
                    <Col key={product.productId}>
                        <StoreItem
                            id={product.productId}
                            name={
                                <Link to={`/product/${product.productId}`} className="text-decoration-none text-dark fw-bold d-inline-block">
                                    {product.productName}
                                </Link>
                            }
                            price={product.price}
                            imgUrl={product.image}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ProductListCategory;
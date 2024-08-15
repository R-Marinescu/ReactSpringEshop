import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreItem from './StoreItem';
import { useProductContext } from '../context/ProductContext';

const ProductList: React.FC = () => {
    const { products, error } = useProductContext();

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h2>Store</h2>
            <Row md={2} xs={1} lg={3} className="g-3">
                {products.map(product => (
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
    );
};

export default ProductList;
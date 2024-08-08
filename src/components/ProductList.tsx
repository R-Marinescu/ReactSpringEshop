// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface Product {
//     productId: number;
//     productName: string;
//     image: string;
// }

// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get<Product[]>('http://localhost:8080/api/products/all', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 setProducts(response.data);
//             } catch (error) {
//                 setError('Failed to fetch products');
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <div className='container mt-4'>
//             <h2>Store</h2>
//             {error && <div className="alert alert-dange">{error}</div>}
//             <ul className='list-group'>
//                 {products.map(product => (
//                     <li key={product.productId} className="list-group-item alig-items-center">
//                         {product.image && (
//                             <img
//                                 src={product.image}
//                                 alt={product.productName}
//                                 className="img-thumbnail mr-3"
//                                 style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                             />
//                         )}
//                         <Link to={`/product/${product.productId}`}>{product.productName}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ProductList;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Col, Row } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import StoreItem from './StoreItem';

// interface Product {
//     productId: number;
//     productName: string;
//     price: number;
//     image: string;
// }

// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get<Product[]>('http://localhost:8080/api/products/all', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 setProducts(response.data);
//             } catch (error) {
//                 setError('Failed to fetch products');
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <>
//             <h2>Store</h2>
//             <Row md={2} xs={1} lg={3} classNgme="g-3">
//                 {products.map(product => (
//                     <Col key={product.productId}>
//                         <StoreItem
//                             id={product.productId}
//                             name={<Link to={`/product/${product.productId}`}
//                                 className="text-decoration-none text-dark fw-bold d-inline-block">{product.productName}</Link>}
//                             price={product.price}
//                             imgUrl={product.image}
//                         />
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     );
// };

// export default ProductList;

import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
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
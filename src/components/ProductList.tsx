import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
    productId: number;
    productName: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>('http://localhost:8080/api/products/all', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='container mt-4'>
            <h2>Product List</h2>
            {error && <div className="alert alert-dange">{error}</div>}
            <ul className='list-group'>
                {products.map(product => (
                    <li key={product.productId} className="list-group-item">
                        <Link to={`/product/${product.productId}`}>{product.productName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
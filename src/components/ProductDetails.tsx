import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductDTO {
  productId: number;
  productName: string;
  price: number;
  stockQuantity: number;
}

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ProductDTO>(`http://localhost:8080/api/products/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          setError('Failed to fetch product details');
        }
      } catch (error) {
        setError('Error fetching product details');
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="container mt-4">
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : product ? (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Product Details</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Product ID:</strong> {product.productId}</li>
              <li className="list-group-item"><strong>Product Name:</strong> {product.productName}</li>
              <li className="list-group-item"><strong>Product Price:</strong> ${product.price}</li>
              <li className="list-group-item"><strong>Stock Quantity:</strong> {product.stockQuantity}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Loading product details...</div>
      )}
    </div>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  productName: string;
  price: string;
  stockQuantity: number;
}

const ProductManager: React.FC = () => {
  const [product, setProduct] = useState<Product>({ productName: '', price: '', stockQuantity: 0 });
  const [productId, setProductId] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const apiUrl = 'http://localhost:8080/api/admin';

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
  }, []);

  const handleCreateProduct = async () => {
    if (!token) {
      setError('No token found');
      return;
    }

    if(!product.productName || !product.price || !product.stockQuantity) {
      setError("Please insert product name, price and quantity")
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/createProduct`,
        product,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setResponseMessage(`Product created successfully: ${response.data.id}`);
    } catch (error) {
      setError('Error creating product');
    }
  };

  const handleUpdateProduct = async () => {
    if (!token) {
      setError('No token found');
      return;
    }
    if (productId === null) {
      setError('Please provide a product ID');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/updateProduct/${productId}`,
        product,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setResponseMessage(`Product updated successfully: ${response.data.id}`);
    } catch (error) {
      setError('Error updating product');
    }
  };

  const handleDeleteProduct = async () => {
    if (!token) {
      setError('No token found');
      return;
    }
    if (productId === null) {
      setError('Please provide a product ID');
      return;
    }

    try {
      await axios.delete(`${apiUrl}/deleteProduct/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setResponseMessage('Product deleted successfully');
    } catch (error) {
      setError('Error deleting product');
    }
  };

  return (
    <div>
  <h2>Product Manager</h2>
  <form>
    <div className="mb-3 row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="form-group">
          <label>Product name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            required
            value={product.productName}
            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
          />
        </div>
      </div>
    </div>
    <div className="mb-3 row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="form-group">
          <label>Product price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Price"
            required
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
      </div>
    </div>
    <div className="mb-3 row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="form-group">
          <label>Product quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Stock quantity"
            required
            value={product.stockQuantity}
            onChange={(e) => setProduct({ ...product, stockQuantity: Number(e.target.value) })}
          />
        </div>
      </div>
    </div>
    <div className="mb-3 row justify-content-center">
      <div className="col-md-6 col-lg-4 text-center">
        <button type="submit" className="btn btn-primary" onClick={handleCreateProduct}>Create Product</button>
      </div>
    </div>
  </form>
  <div className="mb-3 row justify-content-center">
    <div className="col-md-6 col-lg-4">
      <div className="form-group">
        <label>Product Id</label>
        <input
          type="number"
          className="form-control"
          placeholder="Product ID (for update/delete)"
          value={productId ?? ''}
          onChange={(e) => setProductId(e.target.value ? Number(e.target.value) : null)}
        />
      </div>
    </div>
  </div>
  <div className="mb-3 row justify-content-center">
    <div className="col-md-6 col-lg-4 text-center">
      <button className="btn btn-secondary" onClick={handleUpdateProduct}>Update Product</button>
      <button className="btn btn-danger ms-2" onClick={handleDeleteProduct}>Delete Product</button>
    </div>
  </div>
  {responseMessage && <p className="text-center">{responseMessage}</p>}
  {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
</div>
  );
};

export default ProductManager;

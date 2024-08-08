import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  productName: string;
  price: string;
  stockQuantity: number;
  image: File | null;
}

const AdminProductManager: React.FC = () => {
  const [product, setProduct] = useState<Product>({ productName: '', price: '', stockQuantity: 0, image: null });
  const [productId, setProductId] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const apiUrl = 'http://localhost:8080/api/admin';

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
  }, []);

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setError('No token found');
      return;
    }

    if (!product.productName || !product.price || !product.stockQuantity || !product.image) {
      setError("Please insert product name, price, quantity, and image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('price', product.price);
      formData.append('stockQuantity', product.stockQuantity.toString());
      formData.append('image', product.image);

      const response = await axios.post(`${apiUrl}/createProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setResponseMessage(`Product created successfully: ${response.data.id}`);
    } catch (error) {
      setError('Error creating product');
    }
  };

  const handleUpdateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setError('No token found');
      return;
    }
    if (productId === null) {
      setError('Please provide a product ID');
      return;
    }

    try {
      const formData = new FormData();
      if (product.productName) formData.append('productName', product.productName);
      if (product.price) formData.append('price', product.price);
      if (product.stockQuantity) formData.append('stockQuantity', product.stockQuantity.toString());
      if (product.image) formData.append('image', product.image);

      const response = await axios.post(`${apiUrl}/updateProduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setResponseMessage(`Product updated successfully: ${response.data.id}`);
    } catch (error) {
      setError('Error updating product');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProduct({ ...product, image: event.target.files[0] });
    }
  };

  const handleDeleteProduct = async (event: React.FormEvent) => {
    event.preventDefault();
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
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={product.stockQuantity}
          onChange={(e) => setProduct({ ...product, stockQuantity: Number(e.target.value) })}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Create Product</button>
      </form>

      <form onSubmit={handleUpdateProduct}>
        <input
          type="number"
          placeholder="Product ID"
          value={productId || ''}
          onChange={(e) => setProductId(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={product.stockQuantity}
          onChange={(e) => setProduct({ ...product, stockQuantity: Number(e.target.value) })}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Update Product</button>
      </form>

      <form onSubmit={handleDeleteProduct}>
        <input
          type="number"
          placeholder="Product ID"
          value={productId || ''}
          onChange={(e) => setProductId(Number(e.target.value))}
        />
        <button type="submit">Delete Product</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminProductManager;

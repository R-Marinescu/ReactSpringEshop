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
      alert(`Product: ${product.productName} with id : ${response.data.id} created successfully`);
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
      console.log(product.image);

      const response = await axios.post(`${apiUrl}/updateProduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setResponseMessage(`Product updated successfully: ${response.data.id}`);
      alert(`Product updated successfully`)
    } catch (error) {
      setError('Error updating product');
      console.log('Error updating product')
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
      alert('Product with deleted successfully')
    } catch (error) {
      setError('Error deleting product');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleCreateProduct}>
        <div className="mb-3 row justify-content-left">
          <div className="col-md-5 col-lg-4">
            <label htmlFor="Product Name">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="form-control"
              value={product.productName}
              onChange={(e) => setProduct({ ...product, productName: e.target.value })}
            />
            <label htmlFor="Price"> Price</label>
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
            <label htmlFor="Stock Qantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={product.stockQuantity}
              onChange={(e) => setProduct({ ...product, stockQuantity: Number(e.target.value) })}
            />
            <label>Product Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
            <div className="col-md-6 col-lg-4" >
              <button type="submit" className="btn btn-primary w-100 mt-2">Create Product</button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleUpdateProduct}>
        <div className="mb-3 row justify-content-right">
          <div className="col-md-5 col-lg-4">
          <label htmlFor="Product Id">Product Id</label>
            <input
              type="number"
              placeholder="Product Id"
              className="form-control"
              value={productId || ''}
              onChange={(e) => setProductId(Number(e.target.value))}
            />
            <label htmlFor="Product Name">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="form-control"
              value={product.productName}
              onChange={(e) => setProduct({ ...product, productName: e.target.value })}
            />
            <label htmlFor="Price"> Price</label>
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
            <label htmlFor="Storck Qantity">Quantity</label>
            <input
              type="number"
              placeholder="Stock Quantity"
              className="form-control"
              value={product.stockQuantity}
              onChange={(e) => setProduct({ ...product, stockQuantity: Number(e.target.value) })}
            />
            <label>Product Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
            <div className="col-md-6 col-lg-5" >
              <button type="submit" className="btn btn-primary w-100 mt-2">Update Product</button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleDeleteProduct}>
        <div className="mb-3 row justify-content-left">
          <div className="col-md-5 col-lg-4">
            <input
              type="number"
              placeholder="Product ID"
              className="form-control"
              value={productId || ''}
              onChange={(e) => setProductId(Number(e.target.value))}
            />
            <div className="col-md-6 col-lg-4" >
              <button type="submit" className="btn btn-primary w-100 mt-2">Delete Product</button>
            </div>
          </div>
        </div>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminProductManager;

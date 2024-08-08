import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

interface Product {
    productId: number;
    productName: string;
    price: number;
    image: string;
}

interface ProductContextType {
    products: Product[];
    error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

type ProductProviderProps = {
    children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
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
        <ProductContext.Provider value={{ products, error }}>
            {children}
        </ProductContext.Provider>
    );
};

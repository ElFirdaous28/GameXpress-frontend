import React, { createContext, useMemo, useContext, useState, useEffect } from 'react';
import api from '../Services/api';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    // Function to fetch all products
    const fetchAllProducts = async () => {
        try {
            const response = await api.get("v1/admin/products");
            setProducts(response.data); 
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]); // Handle error gracefully
        }
    };

    useEffect(() => {
        fetchAllProducts(); // Fetch products when the provider is mounted
    }, []); // Empty dependency array to only run once when component mounts

    const contextValue = useMemo(() => ({
        products, // Providing products in the context
        fetchAllProducts, // Allow consumers to fetch products if needed
    }), [products]); // Recreate context value when products change

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
}
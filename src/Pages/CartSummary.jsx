import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, Trash2 } from 'lucide-react';
import Layout from './Layout';
import api from '../Services/api';
import { useAuth } from '../Context/AuthContext';
import MessagePopup from '../components/App/MessagePopup';

export default function CartSummary() {
    const { isAuthenticated, user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartSummary, setCartSummary] = useState({
        total_before_tax: 0,
        total_tax: 0,
        total_after_tax: 0,
        total_discount: 0,
        total_final: 0,
        totalItems: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});

    // Frontend pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            setError(null);

            // Use the correct endpoint based on authentication status
            const endpoint = isAuthenticated ? "v2/getCart" : "v2/getCart/Guest";
            const response = await api.get(endpoint);

            // Extract cart items and summary data
            const items = response.data.items || [];
            setCartItems(items);

            // Set initial quantities from cart items
            const initialQuantities = {};
            items.forEach(item => {
                initialQuantities[item.product_id] = item.quantity;
            });
            setQuantities(initialQuantities);

            // Extract summary data
            const { total_before_tax, total_tax, total_after_tax, total_discount, total_final, totalItems } = response.data;
            setCartSummary({
                total_before_tax: total_before_tax || 0,
                total_tax: total_tax || 0,
                total_after_tax: total_after_tax || 0,
                total_discount: total_discount || 0,
                total_final: total_final || 0,
                totalItems: totalItems || items.length
            });

            console.log("API Response:", response.data);
        } catch (err) {
            console.error("Error fetching cart items:", err);
            setError("Failed to load cart items. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated || (!isAuthenticated && sessionStorage.getItem("guestSessionId"))) {
            fetchCartItems();
        }
    }, [isAuthenticated]);

    // Format date for display
    const formatDate = () => {
        const date = new Date();
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Handle quantity change
    const handleQuantityChange = (productId, value) => {
        // Ensure quantity is at least 1
        const newQuantity = Math.max(1, value);
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));
    };

    // Handle update cart item
    const handleUpdateItem = (productId) => {
        console.log(`Updating item ${productId} to quantity: ${quantities[productId]}`);
        // TODO: Implement API call to update cart item
        // api.put("v2/updateCart", { product_id: productId, quantity: quantities[productId] })
    };

    // Handle remove cart item
    const handleRemoveItem = (productId) => {
        console.log(`Removing item ${productId} from cart`);
        // TODO: Implement API call to remove cart item
        // api.delete(`v2/removeFromCart/${productId}`)
    };

    // Frontend pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCartItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cartItems.length / itemsPerPage);

    // Generate array of page numbers to display
    const getPageNumbers = () => {
        const totalPageNumbers = 5; // Show max 5 page numbers
        const pageNumbers = [];

        if (totalPages <= totalPageNumbers) {
            // Show all pages if total pages are less than max
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Calculate range around current page
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + totalPageNumbers - 1);

            // Adjust start page if needed
            if (endPage - startPage < totalPageNumbers - 1) {
                startPage = Math.max(1, endPage - totalPageNumbers + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Cart</h1>
                <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                        {formatDate()} • {cartSummary.totalItems} items
                    </span>
                </div>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading your cart items...</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg border border-red-300">
                    <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <h2 className="text-xl font-medium mb-2">Error Loading Cart</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={fetchCartItems}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && cartItems.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg">
                    <Package size={48} className="mx-auto mb-4 text-gray-400" />
                    <h2 className="text-xl font-medium mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any items to your cart yet.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                        Start Shopping
                    </button>
                </div>
            )}

            {/* Cart Items Table */}
            {!loading && !error && cartItems.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {currentCartItems.map((item) => (
                                    <tr key={item.product_id} className="hover:bg-gray-50 dark:hover:bg-gray-500 dark:hover:bg-gray-750">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="h-16 w-16 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md mr-4">
                                                    <img
                                                        src={item.image ? `http://127.0.0.1:8000/storage/${item.image}` : "/api/placeholder/64/64"}
                                                        alt={item.name}
                                                        className="h-16 w-16 object-cover rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">ID: {item.product_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="text-gray-900 dark:text-gray-100">${Number(item.price).toFixed(2)}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    onClick={() => handleQuantityChange(item.product_id, (quantities[item.product_id] || item.quantity) - 1)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantities[item.product_id] || item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value, 10))}
                                                    className="w-12 px-2 py-1 text-center border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                />
                                                <button
                                                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    onClick={() => handleQuantityChange(item.product_id, (quantities[item.product_id] || item.quantity) + 1)}
                                                    >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right font-medium">
                                            ${(Number(item.price) * (quantities[item.product_id] || item.quantity)).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleUpdateItem(item.product_id)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                                    disabled={quantities[item.product_id] === item.quantity}
                                                    >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveItem(item.product_id)}
                                                    className="px-2 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                                                    >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Cart Summary */}
            {!loading && !error && cartItems.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                You have {cartSummary.totalItems} items in your cart
                            </p>
                            <div className="mt-6">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md w-full md:w-auto">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-gray-700 dark:bg-gray-750 p-4 rounded-lg">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                    <span className="font-medium">${Number(cartSummary.total_before_tax).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                                    <span className="font-medium">${Number(cartSummary.total_tax).toFixed(2)}</span>
                                </div>
                                {Number(cartSummary.total_discount) > 0 && (
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                                        <span className="font-medium text-green-600">-${Number(cartSummary.total_discount).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                                    <span className="font-bold">Total:</span>
                                    <span className="font-bold text-lg">${Number(cartSummary.total_final).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1
                                ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                aria-label="Previous page"
                                >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map(page => (
                            <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md ${currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${currentPage === totalPages
                                ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                            aria-label="Next page"
                            >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}
{/* <MessagePopup
    type="warning"
    title="Connection Issues"
    message="We're having trouble connecting to the server. Your changes may not be saved."
    duration={5000}
/> */}
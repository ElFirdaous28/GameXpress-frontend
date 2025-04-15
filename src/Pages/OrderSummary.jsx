import React, { useState } from 'react';
import { Package, ChevronDown, ChevronUp, Calendar, Clock, CheckCircle, AlertCircle, Truck } from 'lucide-react';
import Layout from './Layout';
let orderData = {
    "current_page": 1,
    "data": [
        {
            "id": 2,
            "user_id": 14,
            "total_price": "44.32",
            "status": "pending",
            "created_at": "2025-01-31T20:28:06.000000Z",
            "updated_at": "2025-04-15T15:12:59.000000Z",
            "total_before_tax": 6322.219999999999,
            "total_tax": 1264.444,
            "total_after_tax": 7586.663999999999,
            "total_discount": 0,
            "total_final": 7586.663999999999,
            "order_items": [
                {
                    "id": 1,
                    "order_id": 2,
                    "product_id": 12,
                    "quantity": 1,
                    "price": "100.00",
                    "created_at": "2025-04-15T15:12:59.000000Z",
                    "updated_at": "2025-04-15T15:12:59.000000Z",
                    "product": {
                        "id": 12,
                        "name": "GTA-5",
                        "slug": "gta-5",
                        "price": "100.00",
                        "stock": 20,
                        "status": "available",
                        "subcategory_id": 1,
                        "remise": "0.00",
                        "created_at": "2025-04-13T23:21:15.000000Z",
                        "updated_at": "2025-04-13T23:21:15.000000Z"
                    }
                },
                {
                    "id": 2,
                    "order_id": 2,
                    "product_id": 6,
                    "quantity": 4,
                    "price": "395.48",
                    "created_at": "2025-04-15T15:12:59.000000Z",
                    "updated_at": "2025-04-15T15:12:59.000000Z",
                    "product": {
                        "id": 6,
                        "name": "veritatis",
                        "slug": "dolore-itaque-fugiat-pariatur-adipisci-porro-pariatur-expedita-maxime",
                        "price": "395.48",
                        "stock": 63,
                        "status": "available",
                        "subcategory_id": 16,
                        "remise": "0.00",
                        "created_at": "2025-04-11T08:25:57.000000Z",
                        "updated_at": "2025-04-11T08:25:57.000000Z"
                    }
                },
                {
                    "id": 3,
                    "order_id": 2,
                    "product_id": 29,
                    "quantity": 5,
                    "price": "928.06",
                    "created_at": "2025-04-15T15:12:59.000000Z",
                    "updated_at": "2025-04-15T15:12:59.000000Z",
                    "product": {
                        "id": 29,
                        "name": "sint",
                        "slug": "officia-et-itaque-eos-non-sed",
                        "price": "928.06",
                        "stock": 51,
                        "status": "available",
                        "subcategory_id": 39,
                        "remise": "0.00",
                        "created_at": "2025-04-15T15:12:59.000000Z",
                        "updated_at": "2025-04-15T15:12:59.000000Z"
                    }
                }
            ]
        }
    ],
    "first_page_url": "http://127.0.0.1:8000/api/v3/orders?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://127.0.0.1:8000/api/v3/orders?page=1",
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/api/v3/orders?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": null,
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "http://127.0.0.1:8000/api/v3/orders",
    "per_page": 10,
    "prev_page_url": null,
    "to": 1,
    "total": 1
}
export default function OrderSummary() {
    const [expandedOrders, setExpandedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const orders = orderData?.data || [];

    // Pagination info from the API response
    const totalPages = orderData?.last_page || 1;
    const currentPageFromApi = orderData?.current_page || 1;

    // Toggle order expansion
    const toggleOrderExpansion = (orderId) => {
        setExpandedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Status badge style helper
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in progress':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Status icon helper
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'in progress':
                return <Truck size={16} className="text-blue-600" />;
            case 'pending':
                return <Clock size={16} className="text-yellow-600" />;
            case 'cancelled':
                return <AlertCircle size={16} className="text-red-600" />;
            default:
                return <Package size={16} className="text-gray-600" />;
        }
    };

    return (
        <Layout>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Orders</h1>
                <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                        Showing {orderData?.from || 0} - {orderData?.to || 0} of {orderData?.total || 0} orders
                    </span>
                </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg">
                    <Package size={48} className="mx-auto mb-4 text-gray-400" />
                    <h2 className="text-xl font-medium mb-2">No Orders Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't placed any orders yet.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            {/* Order Header */}
                            <div
                                className="p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
                                onClick={() => toggleOrderExpansion(order.id)}
                            >
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex items-center mb-2 md:mb-0">
                                        <div className="mr-3">
                                            {getStatusIcon(order.status)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Order #{order.id}</h3>
                                            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center mr-3">
                                                    <Calendar size={14} className="mr-1" />
                                                    {formatDate(order.created_at)}
                                                </span>
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 md:mt-0">
                                        <div className="text-right mr-4">
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Total Amount</div>
                                            <div className="font-bold">${Number(order.total_final).toFixed(2)}</div>
                                        </div>
                                        {expandedOrders.includes(order.id) ?
                                            <ChevronUp size={20} /> :
                                            <ChevronDown size={20} />
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Order Details (expanded) */}
                            {expandedOrders.includes(order.id) && (
                                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-4 py-2 text-left">Product</th>
                                                    <th className="px-4 py-2 text-center">Price</th>
                                                    <th className="px-4 py-2 text-center">Quantity</th>
                                                    <th className="px-4 py-2 text-right">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {order.order_items.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md mr-3">
                                                                    <img
                                                                        src="/api/placeholder/40/40"
                                                                        alt={item.product?.name}
                                                                        className="h-10 w-10 object-cover rounded-md"
                                                                    />
                                                                </div>
                                                                <div className="text-sm">
                                                                    <div className="font-medium">{item.product?.name}</div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">ID: {item.product?.id}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-center">
                                                            ${Number(item.price).toFixed(2)}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-center">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-right">
                                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="mb-4 md:mb-0">
                                                <h4 className="font-medium mb-2">Shipping Details</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Tracking information will appear here when your order ships.
                                                </p>
                                            </div>

                                            <div className="w-full md:w-64">
                                                <h4 className="font-medium mb-2">Order Summary</h4>
                                                <div className="text-sm">
                                                    <div className="flex justify-between py-1">
                                                        <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
                                                        <span>${Number(order.total_before_tax).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between py-1">
                                                        <span className="text-gray-500 dark:text-gray-400">Tax:</span>
                                                        <span>${Number(order.total_tax).toFixed(2)}</span>
                                                    </div>
                                                    {Number(order.total_discount) > 0 && (
                                                        <div className="flex justify-between py-1">
                                                            <span className="text-gray-500 dark:text-gray-400">Discount:</span>
                                                            <span className="text-green-600">-${Number(order.total_discount).toFixed(2)}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between py-1 font-bold border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                                                        <span>Total:</span>
                                                        <span>${Number(order.total_final).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                                        <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 py-1.5 px-3 rounded-md text-sm">
                                            View Details
                                        </button>
                                        {order.status.toLowerCase() === 'pending' && (
                                            <button className="bg-red-100 hover:bg-red-200 text-red-800 py-1.5 px-3 rounded-md text-sm">
                                                Cancel Order
                                            </button>
                                        )}
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md text-sm">
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1
                                ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
};
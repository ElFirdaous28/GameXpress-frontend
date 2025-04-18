import React, { useState } from 'react';
import { Package, X, ShoppingCart, Heart, Star, ArrowRight, ChevronLeft } from 'lucide-react';

export default function RightSidebarProduct() {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Using the order data from your paste
  const orderData = {
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
  };

  // Extract all products from order_items
  const allProducts = [];
  orderData.data.forEach(order => {
    order.order_items.forEach(item => {
      if (item.product) {
        allProducts.push({
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price),
          slug: item.product.slug,
          stock: item.product.stock,
          status: item.product.status,
          image: "/api/placeholder/80/80"  // Using placeholder since actual images not provided
        });
      }
    });
  });

  const toggleProductExpansion = (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
      setSidebarOpen(true);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Right Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full ${sidebarOpen ? 'w-64' : 'w-0'} bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden shadow-lg z-10`}
      >
        {expandedProduct ? (
          <div className="h-full flex flex-col">
            {/* Sidebar header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-medium text-gray-900 dark:text-white">Product Details</h2>
              <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={18} />
              </button>
            </div>

            {/* Product details */}
            <div className="flex-1 overflow-y-auto p-4">
              {(() => {
                const product = allProducts.find(p => p.id === expandedProduct);

                return (
                  <div>
                    <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h2>

                    <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'available'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {product.status}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">Stock: {product.stock}</span>
                    </div>

                    <div className="text-xl font-bold mb-3 text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Product ID: {product.id}<br />
                      Slug: {product.slug}
                    </p>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center mb-2">
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </button>

                    <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md flex items-center justify-center">
                      <Heart size={16} className="mr-2" />
                      Add to Wishlist
                    </button>

                    <button onClick={() => {
                      setExpandedProduct(null);
                      document.body.classList.add('full-page-product-view');
                    }} className="w-full text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 py-2 px-4 mt-4 text-center text-sm">
                      View Full Details
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-medium text-gray-900 dark:text-white">Products</h2>
              <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {allProducts.map(product => (
                <div
                  key={product.id}
                  className="p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                  onClick={() => toggleProductExpansion(product.id)}
                >
                  <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-md mr-3 flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar toggle button when closed */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 bg-white dark:bg-gray-800 shadow-md p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
        >
          <Package size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      )}
    </>
  );
}
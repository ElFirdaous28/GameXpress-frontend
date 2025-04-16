import React, { useState ,useEffect } from 'react';
import { Search, Filter, SortAsc, Heart, ShoppingCart, Star } from 'lucide-react';
import Layout from '../Layout';
import api from "../../Services/api";


export default function ProductListing() {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
      try {
          const response = await api.get("v1/admin/products");
          setProducts(response.data.products);
          console.log(response.data.products);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      fetchProducts();
  }, []);
  

  

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Shop Our Products</h1>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-100 dark:bg-gray-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 py-2 px-4 rounded-md text-sm flex items-center justify-center">
            <Filter size={16} className="mr-2" />
            Filter
          </button>

          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 py-2 px-4 rounded-md text-sm flex items-center justify-center">
            <SortAsc size={16} className="mr-2" />
            Sort
          </button>
        </div>
      </div>

      {/* Category Stats */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">All Products</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{products.length} products available</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm">
              Latest
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 py-1 px-4 rounded-md text-sm">
              Popular
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 py-1 px-4 rounded-md text-sm">
              Price
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <img
                src={product.image || "/api/placeholder/400/320"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock < 5 && product.stock > 0 && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Low Stock
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sold Out
                </span>
              )}
              <button className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600">
                <Heart size={16} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center mb-1">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} className="text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(24)</span>
              </div>
              <span className="text-xs text-gray-500">{product.category}</span>
              <h3 className="font-medium mb-1 hover:text-blue-600 cursor-pointer">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <div className="font-bold">${(Number(product.price)).toFixed(2)}</div>
                <button
                  className={`flex items-center rounded-md px-3 py-1.5 text-sm 
                      ${product.stock > 0
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400'}`}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={14} className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
}

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router';
import api from '../../Services/api';

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantotyToOrder, setQuantotyToOrder] = useState(1);

    const { id } = useParams();
    const productId = parseInt(id);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`v1/admin/products/${productId}`);
            setProduct(response.data.product)
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.product_images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.product_images.length - 1 ? 0 : prev + 1
        );
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stock) {
            setQuantotyToOrder(value);
        }
    };

    const incrementQuantity = () => {
        if (quantotyToOrder < product.stock) {
            setQuantotyToOrder(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantotyToOrder > 1) {
            setQuantotyToOrder(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantotyToOrder} of ${product.name} to cart`);
        // Add your cart logic here
    };

    const handleAddToWishlist = () => {
        console.log(`Added ${product.name} to wishlist`);
        // Add your wishlist logic here
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-300">Home</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2 text-gray-500">/</span>
                                <a href="#" className="text-gray-400 hover:text-gray-300">{product.subcategory?.name || '__'}</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2 text-gray-500">/</span>
                                <span className="text-gray-200">{product.name}</span>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-square">
                            <img
                                src={product.product_images && product.product_images.length > 0
                                    ? `http://127.0.0.1:8000/storage/${product.product_images[currentImageIndex].image_url}`
                                    : "/api/placeholder/600/600"}
                                alt={product.name}
                                className="w-full h-full object-cover" />

                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <button
                                    onClick={handlePrevImage}
                                    className="bg-gray-900 bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white">
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="bg-gray-900 bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {product.product_images?.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-transparent'}`}
                                    onClick={() => setCurrentImageIndex(index)}>
                                    <img
                                        src={product.product_images ? `http://127.0.0.1:8000/storage/${image.image_url}` : "/api/placeholder/150/150"}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                            <p className="text-sm text-gray-400 mt-1">
                                ID: {product.id} | SKU: {product.slug}
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-white">${product.price}</div>
                            {Number(product.remise) > 0 && (
                                <div className="text-sm font-medium px-2 py-1 bg-blue-600 text-white rounded">
                                    SAVE {product.remise}%
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-700 pt-4">
                            <div className="mb-6">
                                <div className="flex items-center mb-2">
                                    <div className={`h-3 w-3 rounded-full mr-2 ${product.status === "available" ? "bg-green-500" : "bg-red-500"}`}></div>
                                    <span className="text-sm font-medium">
                                        {product.status === "available" ? "In Stock" : "Out of Stock"}
                                        {product.status === "available" && ` (${product.stock} units)`}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Category: <span className="text-blue-400">{product.subcategory?.name}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-300 w-24">
                                        stock
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            onClick={decrementQuantity}
                                            className="h-10 w-10 rounded-l-md bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-700">-
                                        </button>
                                        <input
                                            type="number"
                                            id="stock"
                                            value={quantotyToOrder}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            max={product.stock}
                                            className="h-10 w-16 border-y border-gray-700 bg-gray-900 text-center text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        <button
                                            onClick={incrementQuantity}
                                            className="h-10 w-10 rounded-r-md bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-700">+
                                        </button>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <ShoppingCart size={20} className="mr-2" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleAddToWishlist}
                                        className="py-3 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <Heart size={20} />
                                    </button>
                                    <button
                                        className="py-3 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Added</h4>
                                    <p className="text-white">{new Date(product.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-400 mb-1">Last Updated</h4>
                                    <p className="text-white">{new Date(product.updated_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
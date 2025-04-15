// ProductsPage.jsx
import { useEffect, useState } from "react";
import {
    Package,
    Search,
    Plus,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Filter,
    SortAsc
} from "lucide-react";
import Layout from "../Layout";
import api from "../../Services/api";
import AppLink from "../../components/App/Link";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await api.get("v1/admin/products");
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`v1/admin/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.log(error);
        }
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Layout title="Products">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products Management</h1>
                <AppLink to="/products/add" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm flex items-center"><Plus size={16} className="mr-2" />
                    Add Product</AppLink>
            </div>

            {/* Filters and search */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-20 p-2 rounded-full mr-3">
                        <Package size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-medium">All Products</h2>
                        <p className="text-sm text-gray-400">{products.length} products found</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-gray-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>

                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm flex items-center justify-center">
                        <Filter size={16} className="mr-2" />
                        Filter
                    </button>

                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm flex items-center justify-center">
                        <SortAsc size={16} className="mr-2" />
                        Sort
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {currentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-750">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{product.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{product.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">${(Number(product.price)).toFixed(2)
                                        }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{product.stock}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            <AppLink to={`/products/edit/${product.id} `} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-xs flex items-center">
                                                <Edit2 size={12} className="mr-1" />
                                                Edit
                                            </AppLink>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-xs flex items-center">
                                                <Trash2 size={12} className="mr-1" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, products.length)} of {products.length} entries
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
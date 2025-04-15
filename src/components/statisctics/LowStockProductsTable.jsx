import { AlertCircle } from "lucide-react";

export default function LowStockProductsTable({ products }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                    <AlertCircle size={20} className="text-red-500 mr-2" />
                    <div>
                        <h2 className="text-lg font-medium">Low Stock Products</h2>
                        <p className="text-sm text-gray-400 mt-1">Products with stock levels below the threshold</p>
                    </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Current Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-750">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium">{product.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm">{product.stock}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${product.stock <= 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {product.stock <= 2 ? 'Critical' : 'Warning'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-xs">
                                        Restock
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
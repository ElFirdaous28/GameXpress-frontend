import { useState } from "react";
import {
    Package,
    Users,
    FolderTree,
    Grid3X3,
    AlertCircle,
    Search,
    Bell,
    Menu,
    X,
    Settings,
    HelpCircle,
    User,
    BarChart,
    ArrowUp,
    ShoppingCart,
    DollarSign,
    Clock
} from "lucide-react";

export default function Dashboard() {
    // Example data structure - in a real app, this would come from props or API
    const dashboardData = {
        total_products: 457,
        total_users: 2350,
        total_categories: 32,
        total_subcategories: 128,
        low_stock_products: [
            { name: "Wireless Headphones X3", stock: 5 },
            { name: "Ultra HD Monitor 27\"", stock: 3 },
            { name: "Gaming Keyboard RGB", stock: 2 },
            { name: "Smart Watch Series 7", stock: 4 },
            { name: "Bluetooth Speaker", stock: 1 },
        ]
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-900 text-gray-300">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 w-64 bg-gray-800 transition-transform duration-300 ease-in-out z-30
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:z-auto
      `}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
                    <span className="text-xl font-bold text-blue-500">AdminPanel</span>
                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="mt-6 px-4">
                    <div className="py-2 px-4 mb-2 bg-gray-700 rounded-md flex items-center text-white">
                        <BarChart size={20} className="mr-3" />
                        <span>Dashboard</span>
                    </div>
                    <div className="py-2 px-4 mb-2 hover:bg-gray-700 rounded-md flex items-center">
                        <Users size={20} className="mr-3" />
                        <span>Users</span>
                    </div>
                    <div className="py-2 px-4 mb-2 hover:bg-gray-700 rounded-md flex items-center">
                        <Package size={20} className="mr-3" />
                        <span>Products</span>
                    </div>
                    <div className="py-2 px-4 mb-2 hover:bg-gray-700 rounded-md flex items-center">
                        <FolderTree size={20} className="mr-3" />
                        <span>Categories</span>
                    </div>
                    <div className="py-2 px-4 mb-2 hover:bg-gray-700 rounded-md flex items-center">
                        <Grid3X3 size={20} className="mr-3" />
                        <span>Subcategories</span>
                    </div>
                    <div className="py-2 px-4 mb-2 hover:bg-gray-700 rounded-md flex items-center">
                        <ShoppingCart size={20} className="mr-3" />
                        <span>Orders</span>
                    </div>
                    <div className="py-2 px-4 mb-2 hover:bg-gray-700 rounded-md flex items-center">
                        <Settings size={20} className="mr-3" />
                        <span>Settings</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex justify-between items-center h-16 px-6 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="ml-4 text-lg font-medium">Product Dashboard</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-white">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white">
                            <HelpCircle size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white">
                            <Settings size={20} />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            JD
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                        <div className="flex space-x-2">
                            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm flex items-center">
                                <Clock size={16} className="mr-2" />
                                Today
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm flex items-center">
                                <ArrowUp size={16} className="mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Total Products</p>
                                    <p className="text-2xl font-bold mt-1">{dashboardData.total_products}</p>
                                </div>
                                <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                                    <Package size={24} className="text-blue-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 12%</span> since last month
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Total Users</p>
                                    <p className="text-2xl font-bold mt-1">{dashboardData.total_users}</p>
                                </div>
                                <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                                    <Users size={24} className="text-green-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 8%</span> since last month
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Categories</p>
                                    <p className="text-2xl font-bold mt-1">{dashboardData.total_categories}</p>
                                </div>
                                <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                                    <FolderTree size={24} className="text-purple-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 3%</span> since last month
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-orange-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Subcategories</p>
                                    <p className="text-2xl font-bold mt-1">{dashboardData.total_subcategories}</p>
                                </div>
                                <div className="bg-orange-500 bg-opacity-20 p-3 rounded-full">
                                    <Grid3X3 size={24} className="text-orange-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 5%</span> since last month
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Revenue</p>
                                    <p className="text-2xl font-bold mt-1">$24,580</p>
                                </div>
                                <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                                    <DollarSign size={24} className="text-green-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 15%</span> since last month
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Orders</p>
                                    <p className="text-2xl font-bold mt-1">1,243</p>
                                </div>
                                <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                                    <ShoppingCart size={24} className="text-blue-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 10%</span> since last month
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">New Users</p>
                                    <p className="text-2xl font-bold mt-1">156</p>
                                </div>
                                <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                                    <User size={24} className="text-purple-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="text-green-500">↑ 18%</span> since last month
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Products Table */}
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
                                    {dashboardData.low_stock_products.map((product, index) => (
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
                </main>
            </div>
        </div>
    );
}
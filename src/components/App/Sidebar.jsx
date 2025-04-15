import {
    BarChart,
    Users,
    Package,
    FolderTree,
    Grid3X3,
    ShoppingCart,
    Settings,
    X
} from "lucide-react";
import LogoutButton from "../Auth/LogoutButton";

export default function Sidebar({ isOpen, setIsOpen }) {
    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 w-64 bg-gray-800 transition-transform duration-300 ease-in-out z-30
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static lg:z-auto
            `}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
                    <span className="text-xl font-bold text-blue-500">AdminPanel</span>
                    <button className="lg:hidden" onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Make the nav a flex column with full height */}
                <nav className="h-[calc(100%-4rem)] flex flex-col px-4 pt-6 pb-10">
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

                    {/* Spacer pushes this to bottom */}
                    <div className="mt-auto py-2 px-4 hover:bg-gray-700 rounded-md flex items-center text-white">
                        <LogoutButton />
                    </div>
                </nav>
            </div>
        </>
    );
}
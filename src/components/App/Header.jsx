import {
    Search,
    Bell,
    HelpCircle,
    Settings,
    Menu
} from "lucide-react";

export default function Header({ setIsSidebarOpen, title = "Dashboard" }) {
    return (
        <header className="flex justify-between items-center h-16 px-6 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center">
                <button
                    className="lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu size={24} />
                </button>
                <h1 className="ml-4 text-lg font-medium">{title}</h1>
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
    );
}
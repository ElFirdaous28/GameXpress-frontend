import { Package, Users, FolderTree, Grid3X3 } from "lucide-react";

export default function Statistics({ title, value, icon, iconColor, percentageChange }) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border-l-4" style={{ borderColor: iconColor }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">{title}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className={`bg-opacity-20 p-3 rounded-full ${iconColor}`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
                <span className="text-green-500">{percentageChange}</span> since last month
            </div>
        </div>
    );
}
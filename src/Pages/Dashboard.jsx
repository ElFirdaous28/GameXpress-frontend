import LogoutButton from "../components/Auth/LogoutButton";
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Welcome back to your admin dashboard, {user?.user?.name}!
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user?.user?.name}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user?.user?.email}</dd>
                            </div>
                            {/* Add more sections as needed */}
                            <div><LogoutButton /></div> 
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Package, Users, FolderTree, Grid3X3 } from "lucide-react";
import api from '../Services/api';
import Loading from '../components/App/Loading';
import LowStockProductsTable from '../components/statisctics/LowStockProductsTable';
import Statistics from '../components/statisctics/Statistics';

export default function Dashboard() {
    // State to store the fetched data
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('v1/admin/dashboard');
                setDashboardData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    if (loading) return <Loading />


    return (
        <Layout title="Dashboard">
            {/* statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Statistics
                    title="Total Products"
                    value={dashboardData.total_products}
                    icon={<Package size={24} />}
                    iconColor="bg-blue-500"
                    percentageChange="↑ 12%"
                />
                <Statistics
                    title="Total Users"
                    value={dashboardData.total_users}
                    icon={<Users size={24} />}
                    iconColor="bg-green-500"
                    percentageChange="↑ 8%"
                />
                <Statistics
                    title="Categories"
                    value={dashboardData.total_categories}
                    icon={<FolderTree size={24} />}
                    iconColor="bg-purple-500"
                    percentageChange="↑ 3%"
                />
                <Statistics
                    title="Subcategories"
                    value={dashboardData.total_subcategories}
                    icon={<Grid3X3 size={24} />}
                    iconColor="bg-orange-500"
                    percentageChange="↑ 5%"
                />
            </div>

            {/* Low Stock Products Table */}
            <LowStockProductsTable products={dashboardData.low_stock_products} />
        </Layout>
    );
}

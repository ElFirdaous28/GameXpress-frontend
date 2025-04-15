import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Router/PrivateRoute';
import Unauthorized from './Pages/Unauthorized';
import MyTest from './Pages/MyTest';
import { useAuth } from './Context/AuthContext';
import UnauthenticatedRoute from './Router/UnauthenticatedRoute';
import Layout from './Pages/Layout';
import AllProducts from './Pages/Products/AllProducts';
import AddProduct from './Pages/Products/AddProduct';
import EditProduct from './Pages/Products/EditProduct';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ProductListing from './Pages/Products/ProductListing';
import UserManagementTable from './Pages/UserManagementTable';


export default function App() {
  const { loading } = useAuth();

  return (
    <Routes>


      <Route path="/login" element={<UnauthenticatedRoute element={<Login />} />} />
      <Route path="/register" element={<UnauthenticatedRoute element={<Register />} />} />

      <Route path="/unauthorized" element={<Unauthorized />} />


      {/* Protected Routes */}
      {/* <Route element={<PrivateRoute roles={["super_admin"]} />}> */}
      <Route path="/test" element={<MyTest />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />

      <Route path="/" element={<ProductListing />} />
      <Route path="/users" element={<UserManagementTable />} />

      <Route path="/f" element={<Layout />} />
      {/* </Route> */}
    </Routes>
  );
}

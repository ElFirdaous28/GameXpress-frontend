import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Router/PrivateRoute';
import Unauthorized from './Pages/Unauthorized';
import MyTest from './Pages/MyTest';
import Loading from './components/App/Loading';
import { useAuth } from './Context/AuthContext';
import UnauthenticatedRoute from './Router/UnauthenticatedRoute';
import Layout from './Pages/Layout';
import DashboardExample from './Pages/DashboardExample';

export default function App() {
  const { loading } = useAuth();
  if (loading) return <Loading />

  return (
    <Routes>


      <Route path="/login" element={<UnauthenticatedRoute element={<Login />} />} />
      <Route path="/register" element={<UnauthenticatedRoute element={<Register />} />} />

      <Route path="/unauthorized" element={<Unauthorized />} />


      {/* Protected Routes */}
      {/* <Route element={<PrivateRoute roles={["super_admin"]} />}> */}
      <Route path="/test" element={<MyTest />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/example" element={<DashboardExample />} />
      <Route path="/f" element={<Layout />} />
      {/* </Route> */}
    </Routes>
  );
}

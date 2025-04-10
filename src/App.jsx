import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LogoutButton from './components/Auth/LogoutButton';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Router/PrivateRoute';
import Unauthorized from './Pages/Unauthorized';
import Loading from './components/App/Loading';
import { useAuth } from './Context/AuthContext';
import UnauthenticatedRoute from './Router/UnauthenticatedRoute';

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
      <Route path="/dashboard" element={<Dashboard />} />
      {/* </Route> */}
    </Routes>
  );
}

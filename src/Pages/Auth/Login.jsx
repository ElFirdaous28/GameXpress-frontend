import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import AppLink from "../../components/App/Link";

export default function Login({ switchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // ============================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { login } = useAuth(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); 
      console.log("Logged in!");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <p className="mt-2 text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-10 pr-10 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <AppLink to="/register" className="font-medium text-blue-500 hover:text-blue-400">
              Sign up
            </AppLink>
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
                Google
              </button>
            </div>
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
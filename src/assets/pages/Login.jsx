import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, QrCode, Activity } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-900 p-4 rounded-full mb-4">
            <Activity className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Healthcare System</h1>
          <p className="text-gray-500 text-sm">Secure Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username / Email</label>
            <input type="email" placeholder="Enter your email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500" />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400">
              <Eye size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Role</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500 appearance-none">
              <option>Choose your role</option>
              <option>Doctor</option>
              <option>Staff</option>
              <option>Admin</option>
            </select>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition shadow-md">
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-blue-900 text-blue-900 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
          <QrCode size={20} />
          Scan QR Code to Login
        </button>

        <p className="mt-8 text-center text-xs text-gray-400">
          Secure healthcare access • End-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default Login;
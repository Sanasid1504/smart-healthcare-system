import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, LayoutDashboard, Search, UserPlus } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-blue-900 p-1.5 rounded-lg">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-gray-800 hidden sm:block">SmartHealth</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link to="/dashboard" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/register-patient" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <UserPlus size={18} /> Register
            </Link>
            
            {/* UPDATED: Changed '/search' to '/patient-records' */}
            <Link to="/patient-records" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <Search size={18} /> Search
            </Link>
          </div>

          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition text-sm font-semibold"
          >
            <LogOut size={18} /> <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
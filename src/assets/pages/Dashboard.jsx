import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, Search, Users, 
  Activity, FileText, AlertTriangle 
} from 'lucide-react';

const Dashboard = () => {
  const actions = [
    { 
      title: "Register Patient", 
      desc: "Add new patient records and update medical information", 
      icon: <UserPlus />, 
      path: "/register-patient", 
      color: "bg-green-500", 
      lightColor: "bg-green-50 text-green-600" 
    },
    { 
      title: "Search Patient", 
      desc: "Find and view patient medical history and records", 
      icon: <Search />, 
      path: "/patient-records", 
      color: "bg-blue-500", 
      lightColor: "bg-blue-50 text-blue-600" 
    }
  ];

  const stats = [
    { label: "Total Patients", value: "752", icon: <Users size={20} />, color: "bg-blue-50 text-blue-600" },
    { label: "Active Cases", value: "245", icon: <Activity size={20} />, color: "bg-green-50 text-green-600" },
    { label: "Records Updated", value: "1,247", icon: <FileText size={20} />, color: "bg-orange-50 text-orange-600" },
    { label: "Outbreak Alerts", value: "2", icon: <AlertTriangle size={20} />, color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-500 text-lg">Quick access to main features and hospital management tools</p>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
            <span>📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>🕒 {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Main Action Cards - Now in 2 columns */}
      <div className="grid md:grid-cols-2 gap-6">
        {actions.map((item, idx) => (
          <Link key={idx} to={item.path} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition group">
            <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-100`}>
              {React.cloneElement(item.icon, { size: 28 })}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
              <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Updates */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Updates</h2>
          <div className="space-y-4">
            {[
              { text: "New patient registered - Ahmed Khan", time: "5 minutes ago", color: "bg-green-500" },
              { text: "Medical record updated - P102", time: "12 minutes ago", color: "bg-blue-500" },
              { text: "Disease alert triggered - Delhi", time: "1 hour ago", color: "bg-orange-500" }
            ].map((update, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-2 h-2 rounded-full ${update.color}`}></div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{update.text}</p>
                  <p className="text-xs text-gray-400">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">System Status</h2>
          <div className="space-y-6">
            {[
              { label: "Database Health", status: "Excellent", color: "bg-green-500", width: "w-[95%]" },
              { label: "System Load", status: "Normal", color: "bg-blue-500", width: "w-[60%]" },
              { label: "API Response", status: "Fast", color: "bg-green-500", width: "w-[90%]" }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 font-medium">{item.label}</span>
                  <span className={item.color.replace('bg-', 'text-')}>{item.status}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} ${item.width}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
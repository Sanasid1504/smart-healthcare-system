import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Users, AlertCircle, Activity } from 'lucide-react';

const barData = [
  { name: 'Mumbai', cases: 145 },
  { name: 'Pune', cases: 98 },
  { name: 'Delhi', cases: 187 },
  { name: 'Chennai', cases: 112 },
  { name: 'Kolkata', cases: 134 },
];

const pieData = [
  { name: 'Low', value: 245, color: '#10b981' },
  { name: 'Medium', value: 312, color: '#f59e0b' },
  { name: 'High', value: 195, color: '#ef4444' },
];

const alerts = [
  { city: 'Delhi', disease: 'Dengue Fever', count: 187, threshold: 150, level: 'High', color: 'text-red-600', bg: 'bg-red-50', badge: 'bg-red-500' },
  { city: 'Mumbai', disease: 'Malaria', count: 145, threshold: 120, level: 'Medium', color: 'text-orange-600', bg: 'bg-orange-50', badge: 'bg-orange-500' },
  { city: 'Kolkata', disease: 'Typhoid', count: 134, threshold: 100, level: 'High', color: 'text-red-600', bg: 'bg-red-50', badge: 'bg-red-500' },
  { city: 'Bangalore', disease: 'COVID-19', count: 112, threshold: 80, level: 'Medium', color: 'text-orange-600', bg: 'bg-orange-50', badge: 'bg-orange-500' },
];

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Health Analytics Dashboard</h1>
        <p className="text-gray-500">Monitor disease distribution and outbreak patterns</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 font-medium">Total Patients</p>
            <h2 className="text-4xl font-bold text-gray-800 my-1">752</h2>
            <p className="text-green-600 text-sm font-bold flex items-center gap-1">↗ +12% from last month</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-full text-blue-600"><Users size={28} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 font-medium">Outbreak Alerts</p>
            <h2 className="text-4xl font-bold text-red-500 my-1">2</h2>
            <p className="text-red-500 text-sm font-medium">Immediate attention required</p>
          </div>
          <div className="bg-red-50 p-4 rounded-full text-red-500"><AlertCircle size={28} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 font-medium">Active Cases</p>
            <h2 className="text-4xl font-bold text-gray-800 my-1">195</h2>
            <p className="text-gray-400 text-sm font-medium">High severity cases</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-full text-orange-500"><Activity size={28} /></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Bar Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Disease Distribution by Location</h3>
            <p className="text-sm text-gray-400 mb-8">Number of cases reported across major cities</p>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Disease Severity Distribution</h3>
            <p className="text-sm text-gray-400 mb-8">Cases categorized by severity level</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="rect" layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Recent Alerts</h3>
            <p className="text-sm text-gray-400 mb-6">Locations exceeding case thresholds</p>
            
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`${alert.bg} p-5 rounded-2xl border-l-4 ${alert.level === 'High' ? 'border-red-500' : 'border-orange-500'} relative`}>
                  <span className={`absolute top-4 right-4 ${alert.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-md`}>
                    {alert.level}
                  </span>
                  <h4 className="font-bold text-gray-800 text-lg">{alert.city}</h4>
                  <p className="text-sm text-gray-600 mb-2">{alert.disease}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase">
                    <span className={alert.color}>{alert.count} cases</span> (Threshold: {alert.threshold})
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
               <p className="text-[10px] text-gray-400 font-medium">Last updated: March 12, 2026 - 10:30 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
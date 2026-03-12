import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, User, MapPin, Phone, FileText, 
  Calendar, AlertCircle, QrCode 
} from 'lucide-react';

const patientsData = [
  { id: 'P101', name: 'Rajesh Kumar', age: 45, gender: 'Male', location: 'Delhi', phone: '+91 98765 43210', diagnosis: 'Type 2 Diabetes', lastVisit: 'Mar 10, 2026', severity: 'Medium', status: 'Active' },
  { id: 'P102', name: 'Priya Sharma', age: 32, gender: 'Female', location: 'Mumbai', phone: '+91 98765 43211', diagnosis: 'Hypertension', lastVisit: 'Mar 9, 2026', severity: 'Low', status: 'Active' },
  { id: 'P103', name: 'Ahmed Khan', age: 28, gender: 'Male', location: 'Bangalore', phone: '+91 98765 43212', diagnosis: 'COVID-19', lastVisit: 'Mar 12, 2026', severity: 'High', status: 'Critical' },
  { id: 'P104', name: 'Sneha Patel', age: 55, gender: 'Female', location: 'Ahmedabad', phone: '+91 98765 43213', diagnosis: 'Asthma', lastVisit: 'Mar 8, 2026', severity: 'Medium', status: 'Active' },
  { id: 'P105', name: 'Vijay Singh', age: 62, gender: 'Male', location: 'Jaipur', phone: '+91 98765 43214', diagnosis: 'Heart Disease', lastVisit: 'Mar 11, 2026', severity: 'High', status: 'Critical' },
  { id: 'P106', name: 'Anita Desai', age: 38, gender: 'Female', location: 'Pune', phone: '+91 98765 43215', diagnosis: 'Migraine', lastVisit: 'Mar 7, 2026', severity: 'Low', status: 'Active' },
];

const PatientRecord = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPatients = patientsData.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-transparent min-h-screen">
      {/* INTERNAL HEADER REMOVED 
          The main SmartHealth Navbar from App.jsx will now be the only thing visible at the top.
      */}

      <main className="max-w-10xl mx-auto space-y-8">
        {/* Search & Filter Section */}
        <div className="bg-white p-5 rounded-[1rem] shadow-sm border border-gray-100 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, ID, diagnosis, or location..." 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl">
              {['All', 'Active', 'Critical', 'Recovered'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    filter === cat 
                    ? 'bg-blue-900 text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400 font-medium px-2">Showing {filteredPatients.length} of {patientsData.length} patients</p>
        </div>

        {/* Patients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group transition hover:shadow-xl">
              
              <div className="bg-blue-600 p-7 text-white relative">
                <span className={`absolute top-7 right-7 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  patient.status === 'Critical' ? 'bg-red-500 shadow-lg shadow-red-200/50' : 'bg-blue-400'
                }`}>
                  {patient.status}
                </span>
                <h3 className="text-2xl font-bold mb-1">{patient.name}</h3>
                <p className="text-blue-100 text-sm font-mono tracking-tighter uppercase opacity-80">ID: {patient.id}</p>
              </div>

              <div className="p-7 space-y-4 text-sm text-gray-600 flex-1">
                <div className="flex items-center gap-3"><User size={18} className="text-gray-300" /> <span className="font-medium text-gray-700">{patient.age} years • {patient.gender}</span></div>
                <div className="flex items-center gap-3"><MapPin size={18} className="text-gray-300" /> <span className="font-medium text-gray-700">{patient.location}</span></div>
                <div className="flex items-center gap-3"><Phone size={18} className="text-gray-300" /> <span className="font-medium text-gray-700">{patient.phone}</span></div>
                <div className="flex items-center gap-3"><FileText size={18} className="text-gray-300" /> <span className="font-medium text-gray-700">{patient.diagnosis}</span></div>
                <div className="flex items-center gap-3"><Calendar size={18} className="text-gray-300" /> <span className="font-medium text-gray-700">Last Visit: {patient.lastVisit}</span></div>
                <div className="flex items-center gap-3">
                  <AlertCircle size={18} className="text-gray-300" /> 
                  <span className="font-bold">Severity:</span>
                  <span className={`font-black uppercase tracking-wide ${
                    patient.severity === 'High' ? 'text-red-500' : 
                    patient.severity === 'Medium' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {patient.severity}
                  </span>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col items-center group-hover:bg-white transition">
                  <QrCode size={110} strokeWidth={1.5} className="text-gray-800" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3">Scan for quick access</p>
                </div>
              </div>

              <div className="p-7 pt-0">
                <button onClick={() => navigate(`/history/${patient.id}`)}
                className="w-full bg-blue-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 hover:scale-[1.02] transition shadow-lg shadow-blue-100">
                  View Full History
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PatientRecord;
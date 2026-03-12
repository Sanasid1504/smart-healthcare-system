import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const SearchPatient = () => {
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (patientId.trim()) {
      navigate(`/patient/${patientId}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Find Patient Record</h2>
          <p className="text-gray-500">Enter a Patient ID or scan a QR code to view history</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Ex: 9a8c1a8d-1234"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-blue-500 font-mono text-sm"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-sm">
            Search Database
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPatient;
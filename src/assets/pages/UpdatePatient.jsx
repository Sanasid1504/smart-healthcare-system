import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, ClipboardList } from 'lucide-react';

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dummy state - in a real app, you'd fetch this first via useEffect
  const [formData, setFormData] = useState({
    disease: 'Mild Flu',
    prescription: 'Paracetamol 500mg - 2 times a day'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call: PUT /patients/{id}
    alert('Record updated successfully!');
    navigate(`/patient/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft size={18} /> Back to Record
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <ClipboardList size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Update Medical Record</h2>
            <p className="text-sm text-gray-500">Patient ID: <span className="font-mono">{id}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Updated Diagnosis</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
              value={formData.disease}
              onChange={(e) => setFormData({...formData, disease: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Updated Prescription</label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500 min-h-[150px]"
              value={formData.prescription}
              onChange={(e) => setFormData({...formData, prescription: e.target.value})}
              required
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatient;
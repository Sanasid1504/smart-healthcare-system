import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, MapPin, QrCode, Download, ArrowLeft, ShieldCheck } from 'lucide-react';

const PatientRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Demo Data
  const patient = {
    id: id || "PAT-9821-X",
    name: "Ahmed Khan",
    age: 29,
    gender: "Male",
    location: "Andheri, Mumbai",
    disease: "Dengue Fever",
    prescription: "Tab. Paracetamol 500mg (TDS), Bed rest, and Oral Rehydration Therapy.",
    status: "Under Treatment"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800">
        <ArrowLeft size={18} /> Back to Search
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center h-fit">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-100">
            <User className="text-blue-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
          <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-widest">{patient.id}</p>
          <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full inline-block">
            {patient.status}
          </div>
        </div>

        {/* Medical Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="text-blue-600" size={20} /> Patient Information
              </h3>
              <div className="bg-gray-50 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                <QrCode size={20} className="text-gray-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Age / Gender</p>
                <p className="text-gray-800">{patient.age} / {patient.gender}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                <p className="text-gray-800 flex items-center gap-1">
                  <MapPin size={14} className="text-red-500" /> {patient.location}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Diagnosis</p>
                <div className="bg-red-50 p-3 rounded-xl border-l-4 border-red-500 text-red-700 font-semibold">
                  {patient.disease}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Prescription</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700 italic text-sm">
                  "{patient.prescription}"
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-6">Patient Digital ID (QR)</h3>
            <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
               {/* Replace with actual QR component later */}
               <QrCode size={150} className="text-gray-800" />
            </div>
            <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">
              <Download size={18} /> Download Patient QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
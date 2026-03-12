import { useState } from 'react';
import { QrCode, Download, CheckCircle } from 'lucide-react';

const RegisterPatient = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center mb-4 text-green-500">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Registration Successful</h2>
        <p className="text-gray-500 mb-6">Patient ID: 9a8c1a8d-1234</p>
        
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200 mb-6 flex justify-center">
           <QrCode size={180} className="text-gray-800" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold">
          <Download size={20} /> Download QR Code
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register New Patient</h2>
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input required className="mt-1 w-full p-2 border rounded-md" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input type="number" required className="mt-1 w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select className="mt-1 w-full p-2 border rounded-md">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input required className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. Mumbai" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
          <input required className="mt-1 w-full p-2 border rounded-md" placeholder="Current Disease" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Prescription</label>
          <textarea className="mt-1 w-full p-2 border rounded-md" rows="3"></textarea>
        </div>
        <button className="col-span-2 mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Register Patient
        </button>
      </form>
    </div>
  );
};

export default RegisterPatient;
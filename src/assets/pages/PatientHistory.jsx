import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Activity, 
  Pill, ChevronRight, QrCode 
} from 'lucide-react';

// Master Data List
const patientsData = [
  { id: 'P101', name: 'Rajesh Kumar', age: 45, gender: 'Male', location: 'Delhi', phone: '+91 98765 43210', diagnosis: 'Type 2 Diabetes' },
  { id: 'P102', name: 'Priya Sharma', age: 32, gender: 'Female', location: 'Mumbai', phone: '+91 98765 43211', diagnosis: 'Hypertension' },
  { id: 'P103', name: 'Ahmed Khan', age: 28, gender: 'Male', location: 'Bangalore', phone: '+91 98765 43212', diagnosis: 'COVID-19' },
  { id: 'P104', name: 'Sneha Patel', age: 55, gender: 'Female', location: 'Ahmedabad', phone: '+91 98765 43213', diagnosis: 'Asthma' },
  { id: 'P105', name: 'Vijay Singh', age: 62, gender: 'Male', location: 'Jaipur', phone: '+91 98765 43214', diagnosis: 'Heart Disease' },
  { id: 'P106', name: 'Anita Desai', age: 38, gender: 'Female', location: 'Pune', phone: '+91 98765 43215', diagnosis: 'Migraine' },
];

const PatientHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find specific patient
  const currentPatient = patientsData.find(p => p.id === id) || patientsData[0];

  const historyData = [
    {
      date: "Mar 10, 2026",
      type: "Follow-up",
      doctor: "Dr. Aditi Verma",
      vitals: { temp: "98.4°F", bp: "120/80", hr: "72 bpm" },
      prescription: ["Paracetamol 500mg", "Electrolyte Salts"],
      status: "Recovering"
    },
    {
      date: "Mar 05, 2026",
      type: "Emergency Admission",
      doctor: "Dr. Karan Mehra",
      vitals: { temp: "103.2°F", bp: "110/70", hr: "88 bpm" },
      prescription: ["IV Fluids", "Paracetamol 650mg"],
      status: "Critical"
    }
  ];

  return (
    <div className="max-w-10xl mx-auto space-y-10 px-4">
      {/* Header - Download button removed */}
      <div className="flex justify-between items-center">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-blue-600 font-bold mb-2 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={18} /> Back to Records
          </button>
          <h1 className="text-4xl font-black text-gray-900 uppercase">Health Timeline</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-8 relative">
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-gray-100 hidden md:block rounded-full"></div>

          {historyData.map((entry, idx) => (
            <div key={idx} className="relative pl-0 md:pl-24 group">
              <div className={`absolute left-6 top-10 w-5 h-5 rounded-full border-4 border-white shadow-lg hidden md:block z-10 ${
                entry.status === 'Critical' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-800 uppercase leading-none">{entry.type}</h4>
                      <p className="text-blue-600 font-bold text-xs mt-1">{entry.date} • {entry.doctor}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                   <div>
                      <h5 className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <Pill size={12} /> Meds
                      </h5>
                      <div className="space-y-1">
                        {entry.prescription.map((p, i) => (
                          <p key={i} className="flex items-center gap-2 font-bold text-gray-700 text-sm">
                            <ChevronRight size={14} className="text-blue-500"/> {p}
                          </p>
                        ))}
                      </div>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Vitals</h5>
                      <div className="flex justify-between">
                        <div><p className="text-[8px] font-bold text-gray-400 uppercase">BP</p><p className="font-black text-gray-800 text-sm">{entry.vitals.bp}</p></div>
                        <div><p className="text-[8px] font-bold text-gray-400 uppercase">Temp</p><p className="font-black text-gray-800 text-sm">{entry.vitals.temp}</p></div>
                        <div><p className="text-[8px] font-bold text-gray-400 uppercase">HR</p><p className="font-black text-gray-800 text-sm">{entry.vitals.hr}</p></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Card */}
        <div className="sticky top-24">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-blue-50/40 p-6 border-b border-gray-50">
               <h3 className="text-blue-900 font-bold text-xl">Smart Health Card</h3>
               <p className="text-gray-400 text-xs font-medium">Digital identity & quick access</p>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="mx-auto w-44 h-44 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-4">
                 <QrCode size={120} strokeWidth={1.5} className="text-gray-800" />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-gray-400 text-sm">Patient ID</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">{currentPatient.id}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-gray-400 text-sm">Name</span>
                  <span className="font-bold text-gray-900">{currentPatient.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-gray-400 text-sm">Age</span>
                  <span className="font-bold text-gray-900">{currentPatient.age} yrs</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Location</span>
                  <span className="font-bold text-gray-900 text-right w-1/2">{currentPatient.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
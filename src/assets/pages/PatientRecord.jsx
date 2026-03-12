import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiclient from "../Api/api";
import {
  Search,
  User,
  MapPin,
  FileText,
  Calendar,
  Loader2,
  Pencil,
  Trash
} from "lucide-react";

const PatientRecord = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadPatients();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const loadPatients = async () => {
    try {
      setLoading(true);

      if (searchTerm.trim() === "") {
        const res = await apiclient.get("/patients");

        const patientsWithVisits = await Promise.all(
          res.data.map(async (p) => {
            try {
              const visitRes = await apiclient.get(`/patients/${p.id}/visits`);
              return { ...p, visits: visitRes.data };
            } catch {
              return { ...p, visits: [] };
            }
          })
        );

        setPatients(patientsWithVisits);
      } else {
        const patientRes = await apiclient.get(`/patients/${searchTerm}`);
        const visitRes = await apiclient.get(`/patients/${searchTerm}/visits`);

        setPatients([{ ...patientRes.data, visits: visitRes.data }]);
      }

    } catch (err) {
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Delete patient?")) return;
    await apiclient.delete(`/patients/${id}`);
    loadPatients();
  };

  const openEdit = (patient) => {
    setEditing(patient.id);
    setForm(patient);
  };

  const updatePatient = async () => {
    await apiclient.put(`/patients/${editing}`, form);
    setEditing(null);
    loadPatients();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen">
      <main className="max-w-10xl mx-auto space-y-8">

        {/* Search */}
        <div className="bg-white p-5 rounded-[1rem] shadow-sm border space-y-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Patient ID..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p className="text-sm text-gray-400">
            Showing {patients.length} patients
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patients.map((patient) => {
            const latestVisit =
              patient.visits?.length > 0
                ? patient.visits[patient.visits.length - 1]
                : null;

            return (
              <div key={patient.id} className="bg-white rounded-[2.5rem] shadow border flex flex-col">

                <div className="bg-blue-600 p-7 text-white">
                  <h3 className="text-2xl font-bold">{patient.name}</h3>
                  <p className="text-blue-100 text-sm">ID: {patient.id}</p>
                </div>

                <div className="p-7 space-y-4 flex-1">
                  <div className="flex gap-3"><User size={18} /> {patient.age} • {patient.gender}</div>
                  <div className="flex gap-3"><MapPin size={18} /> {patient.location}</div>
                  <div className="flex gap-3"><FileText size={18} /> {latestVisit?.disease || "No diagnosis"}</div>
                  <div className="flex gap-3"><Calendar size={18} /> {new Date(patient.created_at).toLocaleDateString()}</div>

                  <img
                    src={`https://hackstreak-backend.onrender.com/patients/${patient.id}/qr`}
                    className="mx-auto w-24"
                  />
                </div>

                <div className="p-6 flex gap-2">
                  <button
                    onClick={() => navigate(`/history/${patient.id}`)}
                    className="flex-1 bg-blue-900 text-white py-3 rounded-xl"
                  >
                    History
                  </button>

                  <button
                    onClick={() => openEdit(patient)}
                    className="bg-yellow-400 p-3 rounded-xl"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="bg-red-500 p-3 rounded-xl text-white"
                  >
                    <Trash size={16} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* EDIT MODAL */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-4">
              <h2 className="text-xl font-bold">Update Patient</h2>

              <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded" />
              <input name="age" value={form.age} onChange={handleChange} className="w-full p-3 border rounded" />
              <input name="gender" value={form.gender} onChange={handleChange} className="w-full p-3 border rounded" />
              <input name="location" value={form.location} onChange={handleChange} className="w-full p-3 border rounded" />

              <div className="flex justify-end gap-3">
                <button onClick={() => setEditing(null)} className="border px-4 py-2 rounded">Cancel</button>
                <button onClick={updatePatient} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default PatientRecord;
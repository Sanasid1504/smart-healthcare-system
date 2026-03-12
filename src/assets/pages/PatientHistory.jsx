import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiclient from "../Api/api";
import { ArrowLeft, Clock, Pill, FileText, User } from "lucide-react";

const formatDate = (date) => {
  if (!date) return "Date not available";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "Invalid date" : d.toLocaleDateString();
};

const PatientHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [visits, setVisits] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [saving, setSaving] = useState(false);

const [newVisit, setNewVisit] = useState({
  disease: "",
  prescription: "",
  temperature: "",
  bp: "",
  doctor: "",
  doctor_comment: ""
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await apiclient.get(`/patients/${id}`);
        setPatient(patientRes.data);

        const visitsRes = await apiclient.get(`/patients/${id}/visits`);

        const sorted = (visitsRes.data || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setVisits(sorted);
      } catch (err) {
        console.error("Error fetching history", err);
      }
    };

    fetchData();
  }, [id]);

  const handleVisitChange = (e) => {
  setNewVisit({ ...newVisit, [e.target.name]: e.target.value });
};

const addVisit = async () => {
  try {
    setSaving(true);

    await apiclient.post(`/patients/${id}/visits`, {
      disease: newVisit.disease,
      prescription: newVisit.prescription,
      temperature: Number(newVisit.temperature),
      bp: newVisit.bp,
      doctor: newVisit.doctor,
      doctor_comment: newVisit.doctor_comment
    });

    setShowModal(false);

    // reload visits
    const visitsRes = await apiclient.get(`/patients/${id}/visits`);
    setVisits(visitsRes.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    ));

  } catch (err) {
    alert("Visit creation failed");
  } finally {
    setSaving(false);
  }
};

  if (!patient) return <div className="p-10">Loading Patient...</div>;

  return (
    <div className="max-w-10xl mx-auto space-y-10 px-4">

      {/* Header */}
      <div>
        <div className="flex"><button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 font-bold mb-2"
        >
          <ArrowLeft size={18} /> Back to Records
        </button>
        <button
  onClick={() => setShowModal(true)}
  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
>
  + Add Visit
</button></div>
        <h1 className="text-4xl font-black text-gray-900 uppercase">
          Medical Timeline
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 items-start">

        {/* Timeline */}
        <div className="lg:col-span-2 space-y-8">

          {visits.length === 0 && (
            <div className="bg-white p-10 rounded-3xl text-center text-gray-400 font-bold">
              No visit history yet
            </div>
          )}

          {visits.map((visit) => (
            <div key={visit.id} className="bg-white rounded-[2.5rem] border p-8 space-y-6 shadow-sm">

              {/* Disease + Date */}
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-blue-600" />
                <div>
                  <h4 className="text-xl font-black">
                    {visit.disease || "No diagnosis"}
                  </h4>
                  <p className="text-blue-600 text-xs">
                    {formatDate(visit.visit_time || visit.created_at)}
                  </p>
                </div>
              </div>

              {/* Prescription */}
              <div className="pt-4 border-t flex items-start gap-3">
                <Pill size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-[10px] font-black text-gray-400 mb-1">
                    PRESCRIPTION
                  </p>
                  <p className="font-bold text-gray-700">
                    {visit.prescription || "No prescription provided"}
                  </p>
                </div>
              </div>
             {(visit.temperature || visit.bp) && (
      <div className="bg-gray-50 p-5 rounded-2xl border flex justify-between">

        {visit.temperature && (
          <div>
            <p className="text-[10px] font-black text-gray-400">TEMP</p>
            <p className="font-black text-gray-800 text-lg">
              {visit.temperature} °C
            </p>
          </div>
        )}

        {visit.bp && (
          <div>
            <p className="text-[10px] font-black text-gray-400">BP</p>
            <p className="font-black text-gray-800 text-lg">
              {visit.bp}
            </p>
          </div>
        )}

      </div>
    )}
              {/* Comments */}
              {visit.doctor_comment && (
                <div className="flex items-start gap-3">
                  <FileText size={18} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 mb-1">
                      DOCTOR NOTES
                    </p>
                    <p className="font-medium text-gray-700">
                      {visit.doctor_comment}
                    </p>
                  </div>
                </div>
              )}

              {/* Doctor */}
              {visit.doctor && (
                <div className="flex items-start gap-3">
                  <User size={18} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 mb-1">
                      ATTENDED BY
                    </p>
                    <p className="font-medium text-gray-700">
                      {visit.doctor}
                    </p>
                  </div>
                </div>
              )}

            </div>
          ))}

        </div>

        {/* Smart Card */}
        <div className="sticky top-24">
          <div className="bg-white rounded-[2rem] border shadow-xl overflow-hidden">
            <div className="p-8 space-y-8">

              <img
                src={`http://127.0.0.1:8000/patients/${id}/qr`}
                className="mx-auto w-44"
                alt="QR"
              />

              <div className="space-y-4 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Patient ID</span>
                  <span className="font-mono font-bold">{patient.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Name</span>
                  <span className="font-bold">{patient.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Age</span>
                  <span className="font-bold">{patient.age}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Gender</span>
                  <span className="font-bold">{patient.gender}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-bold">{patient.location}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl w-full max-w-lg space-y-4">

      <h2 className="text-xl font-bold">Add New Visit</h2>

      <input name="disease" placeholder="Disease"
        onChange={handleVisitChange}
        className="w-full p-2 border rounded"
      />

      <textarea name="prescription" placeholder="Prescription"
        onChange={handleVisitChange}
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-3">
        <input name="temperature" placeholder="Temperature"
          onChange={handleVisitChange}
          className="p-2 border rounded"
        />
        <input name="bp" placeholder="BP 120/80"
          onChange={handleVisitChange}
          className="p-2 border rounded"
        />
      </div>

      <input name="doctor" placeholder="Doctor Name"
        onChange={handleVisitChange}
        className="w-full p-2 border rounded"
      />

      <input name="doctor_comment" placeholder="Doctor Comment"
        onChange={handleVisitChange}
        className="w-full p-2 border rounded"
      />

      <div className="flex justify-end gap-3 pt-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={addVisit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Visit"}
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default PatientHistory;
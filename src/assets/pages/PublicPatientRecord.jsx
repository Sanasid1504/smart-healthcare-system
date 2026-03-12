import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiclient from "../Api/api";
import { Loader2, FileText, Activity, User } from "lucide-react";

const PublicPatientRecord = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    try {
      const p = await apiclient.get(`/patients/${id}`);
      const v = await apiclient.get(`/patients/${id}/visits`);

      setPatient(p.data);
      setVisits(v.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ));

    } catch {
      alert("Patient record not found");
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/patients/${id}/qr`
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `health_card_${id}.png`;
    a.click();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold">{patient.name}</h1>
          <p className="opacity-80">Health ID: {patient.id}</p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8">

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div><b>Age:</b> {patient.age}</div>
            <div><b>Gender:</b> {patient.gender}</div>
            <div><b>Location:</b> {patient.location}</div>
            <div><b>Height:</b> {patient.height} cm</div>
            <div><b>Weight:</b> {patient.weight} kg</div>
          </div>

          {/* QR */}
          <div className="text-center">
            <img
              src={`http://127.0.0.1:8000/patients/${id}/qr`}
              className="mx-auto w-40"
            />

            <button
              onClick={downloadQR}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Download Health Card
            </button>
          </div>

          {/* VISITS */}
          <div>
            <h2 className="text-xl font-bold mb-4">Medical History</h2>

            {visits.map((v) => (
              <div key={v.id} className="border rounded-xl p-4 mb-4">

                <div className="flex items-center gap-2 font-bold">
                  <Activity size={16} />
                  {v.disease}
                </div>

                <div className="text-sm mt-2">
                  <b>Prescription:</b> {v.prescription}
                </div>

                <div className="text-sm mt-1">
                  <b>Vitals:</b> {v.bp} • {v.temperature}°C
                </div>

                {v.doctor_comment && (
                  <div className="text-sm mt-1">
                    <FileText size={14} className="inline" /> {v.doctor_comment}
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-2">
                  Doctor: {v.doctor}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default PublicPatientRecord;
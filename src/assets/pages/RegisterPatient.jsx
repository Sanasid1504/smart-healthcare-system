import { useState } from 'react';
import apiclient from '../Api/api';
import { Download, CheckCircle, Loader2 } from 'lucide-react';

const RegisterPatient = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    location: "",
    height: "",
    weight: "",
    disease: "",
    prescription: "",
    bp: "",
    temperature: "",
    doctor: "",
    doctor_comment: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // 1️⃣ Create Patient
      const patientRes = await apiclient.post("/patients", {
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        location: form.location,
        height: Number(form.height),
        weight: Number(form.weight)
      });

      const id = patientRes.data.id;
      setPatientId(id);

      // 2️⃣ Create Visit
      await apiclient.post(`/patients/${id}/visits`, {
        disease: form.disease,
        prescription: form.prescription,
        bp: form.bp,
        temperature: Number(form.temperature),
        doctor: form.doctor,
        doctor_comment: form.doctor_comment
      });

      setSubmitted(true);

    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

 const downloadQR = async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/patients/${patientId}/qr`
    );

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `patient_${patientId}_qr.png`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("QR download failed");
    console.error(err);
  }
};

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
        <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold">Registration Successful</h2>
        <p className="text-gray-500 mb-6">Patient ID: {patientId}</p>

        <img
          src={`http://127.0.0.1:8000/patients/${patientId}/qr`}
          className="mx-auto mb-6 w-44"
          alt="QR"
        />

        <button
          onClick={downloadQR}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          <Download size={18} /> Download QR
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Register New Patient</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <div className="col-span-2">
          <label>Name</label>
          <input name="name" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Age</label>
          <input type="number" name="age" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Gender</label>
          <select name="gender" onChange={handleChange} className="w-full p-2 border rounded">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label>Height (cm)</label>
          <input type="number" name="height" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input type="number" name="weight" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-2">
          <label>Location</label>
          <input name="location" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-2 mt-4 font-bold text-gray-700">
          Initial Medical Visit
        </div>

        <div className="col-span-2">
          <label>Disease</label>
          <input name="disease" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-2">
          <label>Prescription</label>
          <textarea name="prescription" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Blood Pressure</label>
          <input name="bp" placeholder="120/80" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Temperature (°C)</label>
          <input type="number" step="0.1" name="temperature" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Doctor Name</label>
          <input name="doctor" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label>Doctor Comments</label>
          <input name="doctor_comment" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button className="col-span-2 bg-blue-600 text-white py-3 rounded-lg font-bold mt-4">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Register Patient"}
        </button>

      </form>
    </div>
  );
};

export default RegisterPatient;
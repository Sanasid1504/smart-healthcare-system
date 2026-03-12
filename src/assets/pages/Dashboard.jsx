import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiclient from '../Api/api';
import {
  UserPlus, Search, Users,
  Activity, FileText, AlertTriangle,
  Loader2, Shield
} from 'lucide-react';

const Dashboard = () => {

  const role = localStorage.getItem("role");

  const [stats, setStats] = useState([]);
  const [recent, setRecent] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  useEffect(() => {
    if (role === "Admin") loadAdminDashboard();
    else loadStaffDashboard();
  }, [role]);

  /* ================= CREATE USER ================= */

  const handleUserChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createUser = async () => {
    try {
      setSaving(true);
      await apiclient.post("/user/register", form);
      setShowCreate(false);
      setForm({ name: "", email: "", password: "", department: "" });
      loadAdminDashboard();
    } catch {
      alert("User creation failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= STAFF DASHBOARD ================= */

  const loadStaffDashboard = async () => {
    try {
      setLoading(true);

      const patientRes = await apiclient.get("/patients");
      const patients = patientRes.data;

      const diseaseRes = await apiclient.get("/patients/analytics/disease");
      const diseaseStats = diseaseRes.data;

      let activeCases = 0;
      let outbreakAlerts = 0;

      diseaseStats.forEach(d => {
        activeCases += d.count;
        if (d.count > 10) outbreakAlerts++;
      });

      let totalVisits = 0;
      let updates = [];

      for (let p of patients) {
        try {
          const visitRes = await apiclient.get(`/patients/${p.id}/visits`);
          const visits = visitRes.data;

          totalVisits += visits.length;

          visits.forEach(v => {
            updates.push({
              text: `${p.name} diagnosed with ${v.disease}`,
              time: new Date(v.created_at).toLocaleString(),
              color: "bg-blue-500"
            });
          });

        } catch {}
      }

      updates.sort((a, b) => new Date(b.time) - new Date(a.time));

      setRecent(updates.slice(0, 5));

      setStats([
        { label: "Total Patients", value: patients.length, icon: <Users size={20} />, color: "bg-blue-50 text-blue-600" },
        { label: "Active Cases", value: activeCases, icon: <Activity size={20} />, color: "bg-green-50 text-green-600" },
        { label: "Records Updated", value: totalVisits, icon: <FileText size={20} />, color: "bg-orange-50 text-orange-600" },
        { label: "Outbreak Alerts", value: outbreakAlerts, icon: <AlertTriangle size={20} />, color: "bg-red-50 text-red-600" },
      ]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADMIN DASHBOARD ================= */

  const loadAdminDashboard = async () => {
    try {
      setLoading(true);
      const res = await apiclient.get("/user/");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  /* ================= ADMIN UI ================= */

  if (role === "Admin") {
    return (
      <div className="max-w-6xl mx-auto space-y-8 pb-12">

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 text-lg">User Management System</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div
            onClick={() => setShowCreate(true)}
            className="cursor-pointer bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md"
          >
            <div className="bg-green-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6">
              <UserPlus />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Create User</h3>
            <p className="text-gray-500">Register doctors or staff</p>
          </div>
          <Link
  to="/analytics"
  className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md"
>
  <div className="bg-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6">
    <Activity />
  </div>
  <h3 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h3>
  <p className="text-gray-500">View disease surveillance insights</p>
</Link>

          <div className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6">
              <Shield />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Total Users</h3>
            <p className="text-gray-500">{users.length} Registered Users</p>
          </div>

        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h2 className="text-xl font-bold mb-6">System Users</h2>

          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 bg-gray-50 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
                <div className="text-sm font-bold text-blue-600">{u.department}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CREATE USER MODAL */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-4">

              <h2 className="text-2xl font-bold">Create Staff User</h2>

              <input name="name" placeholder="Full Name"
                onChange={handleUserChange}
                className="w-full p-3 border rounded-xl" />

              <input name="email" placeholder="Email"
                onChange={handleUserChange}
                className="w-full p-3 border rounded-xl" />

              <input type="password" name="password" placeholder="Password"
                onChange={handleUserChange}
                className="w-full p-3 border rounded-xl" />

              <input name="department" placeholder="Department"
                onChange={handleUserChange}
                className="w-full p-3 border rounded-xl" />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-5 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={createUser}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl"
                >
                  {saving ? "Creating..." : "Create"}
                </button>
              </div>

            </div>
          </div>
        )}
        

      </div>
    );
  }

  /* ================= STAFF UI ================= */

  const actions = [
    {
      title: "Register Patient",
      desc: "Add new patient records",
      icon: <UserPlus />,
      path: "/register-patient",
      color: "bg-green-500"
    },
    {
      title: "Search Patient",
      desc: "View patient medical history",
      icon: <Search />,
      path: "/patient-records",
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">

      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthcare Dashboard</h1>
        <p className="text-gray-500 text-lg">Real-time disease surveillance overview</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {actions.map((item, idx) => (
          <Link key={idx} to={item.path} className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md">
            <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-500">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h2 className="text-xl font-bold mb-6">System Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center border">
              <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h2 className="text-xl font-bold mb-6">Recent Medical Updates</h2>
        <div className="space-y-4">
          {recent.map((u, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className={`w-2 h-2 rounded-full ${u.color}`}></div>
              <div>
                <p className="text-sm font-semibold">{u.text}</p>
                <p className="text-xs text-gray-400">{u.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
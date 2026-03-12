import React, { useEffect, useState } from "react";
import apiclient from "../Api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Loader2 } from "lucide-react";

const getHeatColor = (count) => {
  if (count > 20) return "bg-red-600";
  if (count > 10) return "bg-red-400";
  if (count > 5) return "bg-yellow-400";
  return "bg-green-400";
};

const Analytics = () => {
  const [diseaseData, setDiseaseData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const diseaseRes = await apiclient.get("/patients/analytics/disease");
      const locationRes = await apiclient.get("/patients/analytics/location");

      setDiseaseData(diseaseRes.data);
      setLocationData(locationRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500">Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-16">

      <div>
        <h1 className="text-4xl font-bold">Disease Surveillance Dashboard</h1>
        <p className="text-gray-500">Real-time outbreak monitoring</p>
      </div>

      {/* BAR GRAPH */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Disease Distribution</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={diseaseData}>
            <XAxis dataKey="disease" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* HEATMAP GRID */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Location Heatmap</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {locationData.map((loc, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl text-white text-center font-bold shadow ${getHeatColor(loc.count)}`}
            >
              <div className="text-lg">{loc.location}</div>
              <div className="text-3xl">{loc.count}</div>
              <div className="text-xs opacity-80">Cases</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Analytics;
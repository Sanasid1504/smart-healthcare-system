import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Component & Page Imports
import Navbar from './assets/Components/Navbar';
import Login from './assets/pages/Login';
import Dashboard from './assets/pages/Dashboard';
import PatientHistory from './assets/pages/PatientHistory';
import RegisterPatient from './assets/pages/RegisterPatient';
import PatientRecord from './assets/pages/PatientRecord'; 
import Analytics from './assets/pages/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          {/* 1. PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* 2. PROTECTED APP WRAPPER */}
          <Route path="/*" element={
            <>
              <Navbar /> 
              <main className="flex-1 w-full py-8 px-4 md:px-12">
                <Routes>
                  {/* Default redirect to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  
                  {/* Internal Routes */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="register-patient" element={<RegisterPatient />} />
                  
                  {/* Path is plural for the URL, but Element is singular to match your file */}
                  <Route path="patient-records" element={<PatientRecord />} />
                  
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="history/:id" element={<PatientHistory />} />

                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
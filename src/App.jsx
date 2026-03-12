import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Components/Navbar';
import Login from './assets/pages/Login';
import Dashboard from './assets/pages/Dashboard';
import RegisterPatient from './assets/pages/RegisterPatient';
import PatientRecord from './assets/pages/PatientRecord';
import UpdatePatient from './assets/pages/UpdatePatient';
import SearchPatient from './assets/pages/SearchPatient';
import Analytics from './assets/pages/Analytics';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <>
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/register-patient" element={<RegisterPatient />} />
                  <Route path="/patient/:id" element={<PatientRecord />} />
                  <Route path="/update-patient/:id" element={<UpdatePatient />} />
                  <Route path="/search" element={<SearchPatient />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
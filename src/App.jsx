import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/DashBoard';
import Users from './pages/Users'; // Keep Users page
import Buses from './components/BusManagement'; // Use new BusManagement
import Schedules from './components/BusSchedule'; // Use new BusSchedule
import Bookings from './pages/Bookings'; // Keep Bookings page
import Login from './pages/Login';
import PassengerManagement from './components/PassengerManagement';
import CheckInOutSystem from './components/CheckInOutSystem';
import Report from './components/Report';
import Setting from './components/Setting';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Dashboard - Using new component */}
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        {/* Users Management - Existing page adapted */}
        <Route path="/users" element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />

        {/* Bus Management - Using new component */}
        <Route path="/buses" element={
          <PrivateRoute>
            <Buses />
          </PrivateRoute>
        } />

        {/* Schedule Management - Using new component */}
        <Route path="/schedules" element={
          <PrivateRoute>
            <Schedules />
          </PrivateRoute>
        } />

        {/* Bookings Management - Existing page adapted */}
        <Route path="/bookings" element={
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>
        } />

        {/* New Pages for Lao Version */}
        <Route path="/passengers" element={
          <PrivateRoute>
            <PassengerManagement />
          </PrivateRoute>
        } />

        <Route path="/checkin" element={
          <PrivateRoute>
            <CheckInOutSystem />
          </PrivateRoute>
        } />

        <Route path="/reports" element={
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        } />

        <Route path="/settings" element={
          <PrivateRoute>
            <Setting />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

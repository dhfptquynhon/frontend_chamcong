import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import History from './pages/History';
import Navbar from './components/Navbar';
import AuthContext from './context/AuthContext';

import AdminHistory from './pages/AdminHistory';
import AdminDashboard from './pages/AdminDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [auth, setAuth] = React.useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          {auth && <Navbar />}
          <Routes>
            <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={auth ? <Navigate to="/" /> : <Register />} />
            <Route path="/forgot-password" element={auth ? <Navigate to="/" /> : <ForgotPassword />} />
            <Route path="/" element={auth ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/attendance" element={auth ? <Attendance /> : <Navigate to="/login" />} />
            <Route path="/history" element={auth ? <History /> : <Navigate to="/login" />} />
              <Route path="/admin-history" element={auth ? <AdminHistory /> : <Navigate to="/login" />} />
              <Route path="/admin" element={auth ? <AdminDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
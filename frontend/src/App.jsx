import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import TrackUpload from './pages/TrackUpload';
import PlaylistPage from './pages/PlaylistPage';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <TrackUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <PlaylistPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

import React from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Leinecker/LoginPage';
import CardPage from './pages/Leinecker/CardPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      // <Route path="/" index element={<LoginPage />} />
      {
      // <Route path="/cards" index element={<CardPage />} />
      }
    </Routes>
  </BrowserRouter>
);
}

export default App;

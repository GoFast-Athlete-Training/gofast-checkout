import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Checkout from './pages/Checkout.jsx';
import Success from './pages/Success.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;


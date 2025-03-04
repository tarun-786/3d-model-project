import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/components/Home';
import ModelViewer from '../src/components/ModelViewer';
import ModelUploadForm from './components/Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model/:id" element={<ModelViewer />} />
        <Route path="/upload" element={<ModelUploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
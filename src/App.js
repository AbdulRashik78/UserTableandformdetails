import './App.css';
import React from 'react';
import { EditableTable } from './Components/EditableTable'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PlayerDetailsForm } from './FormDetails/PlayerDetailsForm';
function App() {
  return (
       <Router>
        <Routes>
          <Route path="/" element={<EditableTable />} />
          <Route path="/playerdetailsform" element={<PlayerDetailsForm />} />
        </Routes>
    </Router>

  );
}

export default App;

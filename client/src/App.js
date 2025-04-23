import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormulaList from './pages/FormulaList';
import FormulaDetail from './pages/FormulaDetail';
import SearchPage from './pages/SearchPage';
import './styles/App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<FormulaList />} />
            <Route path="/formula/:id" element={<FormulaDetail />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

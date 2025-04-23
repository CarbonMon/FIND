import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFormulas } from '../services/api';
import FormulaCard from '../components/FormulaCard';
import '../styles/FormulaList.scss';

function FormulaList() {
  const [formulas, setFormulas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormulas = async () => {
      try {
        const data = await getFormulas();
        setFormulas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching formulas:', error);
        setLoading(false);
      }
    };

    fetchFormulas();
  }, []);

  if (loading) {
    return <div className="loading">Loading formulas...</div>;
  }

  return (
    <div className="formula-list">
      <h1>Formula Database</h1>
      <div className="formula-grid">
        {formulas.map(formula => (
          <Link to={`/formula/${formula.id}`} key={formula.id}>
            <FormulaCard formula={formula} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FormulaList;

import React, { useState } from 'react';
import { searchFormulas } from '../services/api';
import FormulaCard from '../components/FormulaCard';
import '../styles/SearchPage.scss';

function SearchPage() {
  const [ingredient, setIngredient] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    
    try {
      const data = await searchFormulas(ingredient, minAmount, maxAmount);
      setResults(data);
    } catch (error) {
      console.error('Error searching formulas:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Formulas</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Ingredient Name</label>
          <input 
            type="text" 
            value={ingredient} 
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient name"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Min Amount</label>
            <input 
              type="number" 
              value={minAmount} 
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="Minimum amount"
            />
          </div>
          
          <div className="form-group">
            <label>Max Amount</label>
            <input 
              type="number" 
              value={maxAmount} 
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Maximum amount"
            />
          </div>
        </div>
        
        <button type="submit" className="search-button" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      <div className="search-results">
        <h2>Results</h2>
        {results.length > 0 ? (
          <div className="formula-grid">
            {results.map(formula => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        ) : (
          <p>No formulas found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;

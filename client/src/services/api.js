const API_URL = 'http://localhost:5000/api';

export const getFormulas = async () => {
  const response = await fetch(`${API_URL}/formulas`);
  if (!response.ok) {
    throw new Error('Failed to fetch formulas');
  }
  return response.json();
};

export const getFormulaById = async (id) => {
  const response = await fetch(`${API_URL}/formulas/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch formula');
  }
  return response.json();
};

export const searchFormulas = async (ingredient, minAmount, maxAmount) => {
  let url = `${API_URL}/formulas/search?`;
  
  if (ingredient) {
    url += `ingredient=${encodeURIComponent(ingredient)}&`;
  }
  
  if (minAmount) {
    url += `min_amount=${encodeURIComponent(minAmount)}&`;
  }
  
  if (maxAmount) {
    url += `max_amount=${encodeURIComponent(maxAmount)}&`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search formulas');
  }
  return response.json();
};

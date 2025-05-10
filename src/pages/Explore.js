import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/explore.css';

const API_KEY = 'd0fk249r01qsv9ei00hgd0fk249r01qsv9ei00i0'; 

function Explore() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/stock/suggestions?token=${API_KEY}`
      );
      console.log('API Response:', response.data); 


      if (Array.isArray(response.data) && response.data.length > 0) {
        setSuggestions(response.data);
      } else {
        setSuggestions([]); 
      }
    } catch (error) {
      console.error('Error fetching stock suggestions', error);
      setSuggestions([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="explore">
      <h1>Explore Stocks</h1>
      {loading ? (
        <p>Loading suggestions...</p>
      ) : (
        <section className="suggestions-section">
          <h2>Watchlist Suggestions</h2>
          <div className="suggestions-grid">
            {suggestions.length > 0 ? (
              suggestions.map((stock, i) => (
                <div key={i} className="suggestion-card">
                  <p>{stock.symbol || 'N/A'}</p> 
                  <h3>{stock.name || 'No name available'}</h3>
                  <button className="add-to-watchlist-btn">
                    Add to Watchlist
                  </button>
                </div>
              ))
            ) : (
              <p>No suggestions available</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Explore;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import '../styles/navbar.css';

const API_KEY = 'd0fk249r01qsv9ei00hgd0fk249r01qsv9ei00i0';

function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      const res = await axios.get(
        `https://finnhub.io/api/v1/search?q=${query}&token=${API_KEY}`
      );
      setResults(res.data.result.slice(0, 5)); // show top 5 results
    };

    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 400); 

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Groww</Link>
        <Link to="/explore" className="nav-link">Explore</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {results.length > 0 && (
          <ul className="search-dropdown">
            {results.map((item, i) => (
              <li key={i} onClick={() => {
                navigate(`/dashboard?symbol=${item.symbol}`);
                setQuery('');
                setResults([]);
              }}>
                {item.symbol} - {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="nav-right">
        <span className="icon">🔔</span>
        <div className="profile-dropdown">
          <button className="profile-btn">👤</button>
          <div className="dropdown-content">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

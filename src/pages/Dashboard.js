import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { getUserWatchlist, addToWatchlist, removeFromWatchlist } from '../utils/watchlist';
import '../styles/dashboard.css';
import '../styles/watchlist.css';
const API_KEY = 'd0fk249r01qsv9ei00hgd0fk249r01qsv9ei00i0'; 

function Dashboard() {
  const [indices, setIndices] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchedStock, setSearchedStock] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchedSymbol = queryParams.get('symbol');

  const indexSymbols = [
    { name: 'NIFTY 50', symbol: '^NSEI' },
    { name: 'SENSEX', symbol: '^BSESN' }
  ];

  const stockSymbols = [
    { name: 'Reliance', symbol: 'RELIANCE.BSE' },
    { name: 'Adani Power', symbol: 'ADANIPOWER.BSE' },
    { name: 'Infosys', symbol: 'INFY.BSE' },
    { name: 'TCS', symbol: 'TCS.BSE' }
  ];

  useEffect(() => {
    fetchIndices();
    fetchStocks();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      fetchWatchlist();
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (searchedSymbol) {
      fetchSearchedStock(searchedSymbol);
    }
  }, [searchedSymbol]);

  const fetchIndices = async () => {
    const data = await Promise.all(
      indexSymbols.map(async (idx) => {
        const res = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${idx.symbol}&token=${API_KEY}`
        );
        return {
          name: idx.name,
          value: res.data.c,
          change: (res.data.c - res.data.pc).toFixed(2),
          changePercent: (((res.data.c - res.data.pc) / res.data.pc) * 100).toFixed(2)
        };
      })
    );
    setIndices(data);
  };

  const fetchStocks = async () => {
    const data = await Promise.all(
      stockSymbols.map(async (stock) => {
        const res = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
        );
        return {
          name: stock.name,
          symbol: stock.symbol,
          price: res.data.c,
          change: (res.data.c - res.data.pc).toFixed(2),
          changePercent: (((res.data.c - res.data.pc) / res.data.pc) * 100).toFixed(2)
        };
      })
    );
    setStocks(data);
  };

  const fetchWatchlist = async () => {
    const data = await getUserWatchlist(auth.currentUser.uid);
    setWatchlist(data);
  };

  const toggleWatchlist = async (symbol) => {
    if (!auth.currentUser) return;

   
    const updatedWatchlist = watchlist.includes(symbol)
      ? watchlist.filter((s) => s !== symbol)
      : [...watchlist, symbol];

    setWatchlist(updatedWatchlist);  

    try {
      if (updatedWatchlist.includes(symbol)) {
        await addToWatchlist(auth.currentUser.uid, symbol);
      } else {
        await removeFromWatchlist(auth.currentUser.uid, symbol);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  const fetchSearchedStock = async (symbol) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      if (res.data && res.data.c !== 0) {
        setSearchedStock({
          symbol,
          price: res.data.c,
          change: (res.data.c - res.data.pc).toFixed(2),
          changePercent: (((res.data.c - res.data.pc) / res.data.pc) * 100).toFixed(2)
        });
      } else {
        setSearchedStock(null);
      }
    } catch (error) {
      console.error('Error fetching searched stock:', error);
      setSearchedStock(null);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h1>Market Overview</h1>

     
      {searchedSymbol && (
        <section className="searched-section">
          <h2>Searched Stock: {searchedSymbol}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : searchedStock ? (
            <div className="stock-card">
              <p>{searchedStock.symbol}</p>
              <h3>₹{searchedStock.price}</h3>
              <span className={searchedStock.change >= 0 ? 'green' : 'red'}>
                {searchedStock.change} ({searchedStock.changePercent}%)
              </span>
              <button
                onClick={() => toggleWatchlist(searchedStock.symbol)}
                className="watchlist-btn"
              >
                {watchlist.includes(searchedStock.symbol)
                  ? 'Remove from Watchlist'
                  : 'Add to Watchlist'}
              </button>
            </div>
          ) : (
            <p>No data found for "{searchedSymbol}"</p>
          )}
        </section>
      )}

    
      <section className="indices-section">
        <h2>Indices</h2>
        <div className="indices-grid">
          {indices.map((item, i) => (
            <div key={i} className="index-card">
              <p>{item.name}</p>
              <h3>{item.value}</h3>
              <span className={item.change >= 0 ? 'green' : 'red'}>
                {item.change} ({item.changePercent}%)
              </span>
            </div>
          ))}
        </div>
      </section>

    
      <section className="trending-section">
        <h2>Most Traded Stocks</h2>
        <div className="trending-grid">
          {stocks.map((stock, i) => (
            <div key={i} className="stock-card">
              <p>{stock.name}</p>
              <h3>₹{stock.price}</h3>
              <span className={stock.change >= 0 ? 'green' : 'red'}>
                {stock.change} ({stock.changePercent}%)
              </span>
              <button
                onClick={() => toggleWatchlist(stock.symbol)}
                className="watchlist-btn"
              >
                {watchlist.includes(stock.symbol)
                  ? 'Remove from Watchlist'
                  : 'Add to Watchlist'}
              </button>
            </div>
          ))}
        </div>
      </section>

     
      <section className="watchlist-section">
        <h2>Your Watchlist</h2>
        <div className="watchlist">
          {watchlist.length > 0 ? (
            watchlist.map((symbol, i) => (
              <div key={i} className="watchlist-item">
                <p>{symbol}</p>
                <button
                  onClick={() => toggleWatchlist(symbol)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No stocks in your watchlist</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

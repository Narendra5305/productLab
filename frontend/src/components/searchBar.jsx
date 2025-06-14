import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./componentCss/searchBar.css";
import { UserContext } from "../context/contextApi";
import axios from "axios";

const SearchBar = ({
  searchA,
  setSearchA,
  searchB,
  setSearchB,
  handleSearch,
  info,
}) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);

  const [suggestionsA, setSuggestionsA] = useState([]);
  const [suggestionsB, setSuggestionsB] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/signin");
  };

  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) return setSuggestions([]);

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      setSuggestions(res.data.slice(0, 5)); // show only top 5
    } catch (err) {
      console.error("Suggestion fetch error:", err);
    }
  };

  useEffect(() => {
    const timeoutA = setTimeout(() => fetchSuggestions(searchA, setSuggestionsA), 400);
    return () => clearTimeout(timeoutA);
  }, [searchA]);

  useEffect(() => {
    const timeoutB = setTimeout(() => fetchSuggestions(searchB, setSuggestionsB), 400);
    return () => clearTimeout(timeoutB);
  }, [searchB]);

  const handleSelectA = (place) => {
    setSearchA(place.display_name);
    setSuggestionsA([]);
  };

  const handleSelectB = (place) => {
    setSearchB(place.display_name);
    setSuggestionsB([]);
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-box">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="From (Point A)"
            value={searchA}
            onChange={(e) => setSearchA(e.target.value)}
          />
          {suggestionsA.length > 0 && (
            <ul className="suggestion-list">
              {suggestionsA.map((sug, i) => (
                <li key={i} onClick={() => handleSelectA(sug)}>
                  {sug.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="To (Point B)"
            value={searchB}
            onChange={(e) => setSearchB(e.target.value)}
          />
          {suggestionsB.length > 0 && (
            <ul className="suggestion-list">
              {suggestionsB.map((sug, i) => (
                <li key={i} onClick={() => handleSelectB(sug)}>
                  {sug.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={handleSearch}>Search Route</button>

        <div className="auth-button">
          {!token ? (
            <button onClick={() => navigate("/signin")}>Sign in</button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>

      <p className="click-hint">Or click on the map to set Point B</p>

      {info && (
        <div className="info-display">
          <div><strong>Distance:</strong> {info.distance} km</div>
          <div><strong>ETA:</strong> {info.time} minutes</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

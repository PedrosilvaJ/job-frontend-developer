import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
      onSearch(searchQuery);
    }
  }, []); 

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      navigate(`/?q=${encodeURIComponent(value)}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }

    onSearch(value);
  };

  const handleClearSearch = () => {
    setQuery(""); 
    onSearch(""); 
    navigate("/", { replace: true }); 
  };

  return (
    <nav>
      <div>
        {(location.pathname !== "/" || location.search) && (
          <button onClick={handleSearch}>
            ← Voltar para Home
          </button>
        )}
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          value={query}
          onChange={handleSearch}
        />
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (location.pathname.includes("/news/")) {
      navigate("/", { state: { searchQuery: value } });
    } else {
      onSearch(value);
    }
  };

  return (
    <nav>
      <div>
        {location.pathname.includes("/news/") && (
          <button onClick={() => navigate("/")}>
            ← Voltar para Lista
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
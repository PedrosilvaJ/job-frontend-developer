import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav>
      <div>
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
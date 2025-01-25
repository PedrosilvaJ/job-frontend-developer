import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../assets/images/Logo.svg';
import '../assets/styles/main.css';
import '../assets/styles/navbar.css';

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
    <section className="navigation">
    <nav className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="box-nav">
                <img src={Logo} alt="Logo" className="logotype"></img>
                <h1 className="title-nav">Explore as últimas notícias 
                sobre tecnologia da web</h1>
                <p className="text-nav">Selecionamos todas as notícias sobre tecnologia<br />
                produzidas na web para você. Aproveite, foi tudo feito com dedicação.</p>
                {(location.pathname !== "/" || location.search) && (
                <button onClick={handleSearch} className="backhome-button">Home</button>
                )}
                <input
                type="text"
                placeholder="Buscar por título ou autor..."
                className="search-input"
                value={query}
                onChange={handleSearch}
                />
            </div>
        </div>
      </div>
    </nav>
    </section>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { fetchNews } from "../api/apiService";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
        setFilteredNews(data);
      } catch (err) {
        setError("Erro ao carregar os posts.");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const handleClick = (article, index) => {
    const formattedSlug = `${article.title}-${index}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  
    navigate(`/news/${formattedSlug}`, { state: { article } });
  };

  const handleSearch = (query) => {
    const filtered = news.filter((item) => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <h1>Lista de Noticias</h1>
      {currentItems.length === 0 ? (
        <div>
          <p>Matéria não encontrada</p>
          <h1>Sugestões de notícias</h1>
          <ul>
            {news.slice(0, 20).map((item, index) => (
              <li key={index} onClick={() => handleClick(item, index)}>      
                <img src={item.urlToImage} alt={item.title} />
                <span>{item.sourceName}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span><img src={item.authorImage} alt={`Imagem de ${item.author}`}></img>{item.author}</span>
                <p>{item.publishedAt}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <ul>
            {currentItems.map((item, index) => (
              <li key={index} onClick={() => handleClick(item, index)}>      
                <img src={item.urlToImage} alt={item.title} />
                <span>{item.sourceName}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span><img src={item.authorImage} alt={`Imagem de ${item.author}`}></img>{item.author}</span>
                <p>{item.publishedAt}</p>
              </li>
            ))}
          </ul>
          <div>
            {Array.from({ length: Math.ceil(filteredNews.length / itemsPerPage) }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;

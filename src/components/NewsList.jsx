import React, { useEffect, useState } from "react";
import { fetchNews } from "../api/apiService";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import '../assets/styles/newslist.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false); // Novo estado para controle da busca
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
    if (query.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    const filtered = news.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author?.toLowerCase().includes(query.toLowerCase())
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
      <div className="box-newslist">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h2 className="title-newslist">
              {isSearching && filteredNews.length > 0 ? "Resultados da sua busca" : !isSearching ? "Últimas Notícias" : ""}
              </h2>
              {currentItems.length === 0 ? (
                <div>
                  <p className="text-result">Não foi resultado foi encontrado com o termo pesquisado. <br />
                  Talvez pode você gostar da nossa sugestão de notícias</p>
                  <h2 className="title-newslist">Sugestões de notícias</h2>
                  <ul className="newslist-content">
                    {news.slice(0, 20).map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        onClick={() => handleClick(item, index)}
                        className="news"
                      >
                        <img className="image-news" src={item.urlToImage} alt={item.title} />
                        <span className="source-news">{item.sourceName}</span>
                        <h2 className="title-news">{item.title}</h2>
                        <p className="description-news">{item.description}</p>
                        <div className="box-author">
                          <img
                            src={item.authorImage}
                            alt={`Imagem de ${item.author}`}
                            className="image-author"
                          />
                          <span className="name-author">{item.author}</span>
                        </div>
                        <p className="date-author">{item.publishedAt}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <ul className="newslist-content">
                    {currentItems.map((item, index) => (
                      <li
                        key={`${item.title}-${index}`}
                        onClick={() => handleClick(item, index)}
                        className="news"
                      >
                        <img className="image-news" src={item.urlToImage} alt={item.title} />
                        <span className="source-news">{item.sourceName}</span>
                        <h2 className="title-news">{item.title}</h2>
                        <p className="description-news">{item.description}</p>
                        <div className="box-author">
                          <img
                            src={item.authorImage}
                            alt={`Imagem de ${item.author}`}
                            className="image-author"
                          />
                          <span className="name-author">{item.author}</span>
                        </div>
                        <p className="date-author">{item.publishedAt}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="pagination">
                    {Array.from(
                      { length: Math.ceil(filteredNews.length / itemsPerPage) },
                      (_, i) => (
                        <button
                          key={i}
                          className={currentPage === i + 1 ? "active" : ""}
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;

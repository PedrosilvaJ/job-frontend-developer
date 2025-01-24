import React, { useEffect, useState } from "react";
import { fetchNews } from "../api/apiService";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data.slice(0, 20));
      } catch (err) {
        setError("Erro ao carregar os posts.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Noticias</h1>
        <ul>
        {news.map((item, index) => (
            <li key={index}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default NewsList;

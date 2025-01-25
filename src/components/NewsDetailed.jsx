import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { fetchNews } from "../api/apiService";

const NewsDetailed = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        let selectedArticle = null;

        if (location.state?.article) {
          // Se a notícia veio da navegação interna
          selectedArticle = location.state.article;
        } else if (slug) {
          // Extrair as três primeiras palavras do título da URL
          const slugParts = slug.split("-");
          const extractedTitle = slugParts.slice(0, 3).join(" ").toLowerCase();
          console.log("Título extraído da URL:", extractedTitle);
          
          const news = await fetchNews();
          selectedArticle = news.find((item) =>
            item.title.toLowerCase().includes(extractedTitle)
          );

          if (!selectedArticle) {
            throw new Error("Notícia não encontrada.");
          }
        } else {
          throw new Error("Título inválido na URL.");
        }

        setArticle(selectedArticle);
      } catch (err) {
        setError(err.message || "Erro ao carregar a notícia.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, location.state]);

  // Voltar para a lista de notícias com o filtro aplicado
  const handleSearch = (query) => {
    navigate("/", { state: { searchQuery: query } });
  };

  if (loading) return <p>Carregando notícia...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {article ? (
        <div>
          <h1>{article.title}</h1>
          <p><strong>Título extraído:</strong> {article.title}</p>
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{ maxWidth: "100%" }}
          />
          <p>
            <strong>Fonte:</strong> {article.sourceName}
          </p>
          <p>
            <strong>Conteúdo:</strong> {article.content}
          </p>
        </div>
      ) : (
        <p>Notícia não encontrada.</p>
      )}
    </div>
  );
};

export default NewsDetailed;

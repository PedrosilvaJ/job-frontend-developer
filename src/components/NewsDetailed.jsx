import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { fetchNews } from "../api/apiService";
import ReadLimitPopup from "./LimitPopup";

const NewsDetailed = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        let selectedArticle = null;

        if (location.state?.article) {
          selectedArticle = location.state.article;
        } else if (slug) {
          const slugParts = slug.split("-");
          const extractedTitle = slugParts.slice(0, 3).join(" ").toLowerCase();
          const news = await fetchNews();
          selectedArticle = news.find((item) =>
            item.title.toLowerCase().includes(extractedTitle)
          );
          if (!selectedArticle) throw new Error("Notícia não encontrada.");
        }

        if (selectedArticle) {
          checkReadingLimits(selectedArticle);
          setArticle(selectedArticle);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadArticle();
  }, [slug, location.state]);

  const checkReadingLimits = (article) => {
    const today = new Date().toISOString().split("T")[0];
    let storedArticles = JSON.parse(localStorage.getItem("articles_read")) || [];

    // Remover leituras antigas (somente manter as do dia atual)
    storedArticles = storedArticles.filter((item) => item.date === today);

    // Verificar se a matéria já foi lida
    const existingArticle = storedArticles.find((item) => item.title === article.title);

    if (existingArticle) {
      if (existingArticle.readCount < 2) {
        existingArticle.readCount += 1;
      } else {
        setPopupMessage("Você já leu esta matéria 2 vezes.");
        setShowPopup(true);
        return;
      }
    } else {
      storedArticles.push({ title: article.title, readCount: 1, date: today });
    }

    // Verificar se o limite de 10 matérias foi atingido
    if (storedArticles.length >= 10) {
      setPopupMessage("Você atingiu o limite de 10 matérias por dia.");
      setShowPopup(true);
      return;
    }

    localStorage.setItem("articles_read", JSON.stringify(storedArticles));
  };

  if (!article) return <p>Carregando notícia...</p>;

  return (
    <div>
      <Navbar />
      {showPopup && <ReadLimitPopup message={popupMessage} onClose={() => setShowPopup(false)} />}
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} style={{ maxWidth: "100%" }} />
      <p><strong>Fonte:</strong> {article.sourceName}</p>
      <p><strong>Conteúdo:</strong> {article.content}</p>
    </div>
  );
};

export default NewsDetailed;

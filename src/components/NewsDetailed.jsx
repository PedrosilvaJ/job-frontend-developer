import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { fetchNews } from "../api/apiService";
import ReadLimitPopup from "./LimitPopup";
import '../assets/styles/main.css';
import '../assets/styles/newsdetailed.css';

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
    storedArticles = storedArticles.filter((item) => item.date === today);

    const existingArticle = storedArticles.find((item) => item.title === article.title);
    if (existingArticle) {
      if (existingArticle.readCount < 3) {
        existingArticle.readCount += 1;
      } else {
        setPopupMessage("Você já leu esta matéria 2 vezes hoje, atigindo o limite.");
        setShowPopup(true);
        return;
      }
    } else {
      storedArticles.push({ title: article.title, readCount: 1, date: today });
    }

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
      <div className="container">
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="box-detailed">
                    <p className="source-detailed">{article.sourceName}</p>
                    <h1 className="title-detailed">{article.title}</h1>
                    <div className="box-author-detailed">
                          <img
                            src={article.authorImage}
                            alt={`Imagem de ${article.author}`}
                            className="image-author"
                          />
                          <span className="name-author">{article.author}</span>
                          <p className="date-author">{article.publishedAt}</p>
                        </div>
                    <img src={article.urlToImage} alt={article.title} className="image-detailed" style={{ maxWidth: "100%" }} />
                    <p className="text-detailed">{article.content}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailed;

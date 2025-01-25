import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const DEFAULT_IMAGE = "/src/assets/images/user.png";

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${API_URL}?category=technology&apiKey=${API_KEY}`);
    const formattedArticles = response.data.articles.map((article, index) => {
        const publishedDate = new Date(article.publishedAt);
        const formattedDate = publishedDate.toLocaleDateString("pt-BR"); 
        return {
          ...article,
          id: index,
          author: article.author || "Desconhecido",  
          authorImage: DEFAULT_IMAGE,
          sourceName: article.source.name,
          publishedAt: formattedDate || "Data desconhecida", 
        };
      });
      return formattedArticles;
  } catch (error) {
    console.error("Erro ao buscar os noticias:", error);
    throw error;
  }
};
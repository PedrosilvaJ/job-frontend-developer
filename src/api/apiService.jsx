import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${API_URL}?domains=globo.com,news.gloogle.com&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error("Erro ao buscar os noticias:", error);
    throw error;
  }
};
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from "./components/NewsList";
import NewsDetailed from "./components/NewsDetailed";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NewsList />} />
      <Route path="/news/:slug" element={<NewsDetailed />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  </Router>
);

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ListPage from "../src/pages/ListPage/ListPage";
import PostPage from "../src/pages/PostPage/PostPage";
import AnswerPage from "../src/pages/AnswerPage/AnswerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post/:id/answer" element={<AnswerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

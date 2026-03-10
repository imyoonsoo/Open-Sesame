import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ListPage from '@/pages/ListPage/ListPage';
import PostPage from '@/pages/PostPage/PostPage';
import AnswerPage from '@/pages/AnswerPage/AnswerPage';
import DevPage from '@/pages/DevPage/DevPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
        <Route path="/c" element={<DevPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import HomePage from '@/pages/HomePage';
import ListPage from '@/pages/ListPage/ListPage';
import PostPage from '@/pages/PostPage/PostPage';
import AnswerPage from '@/pages/AnswerPage/AnswerPage';
import Layout from '@/layouts/Layout';

function App() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path="/list" element={<ListPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/:id/answer" element={<AnswerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}

export default App;

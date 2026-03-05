import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSubjects } from '../../api/openmindApi';

import ListTopBar from './components/list/ListTopBar';
import ListHeader from './components/list/ListHeader';
import FeedGrid from './components/FeedGrid';
import Pagination from './pagination/Pagination';

import './ListPage.css';

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '이름순', value: 'name' },
];

function ListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const sort = searchParams.get('sort') ?? 'latest';

  const [subjects, setSubjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoHome = () => navigate('/');

  const handleGoAnswer = () => {
    // ⚠️ HomePage(피드 생성)에서 이 키 이름으로 저장한다고 팀 합의
    const mySubjectId = localStorage.getItem('openmind_subject_id');

    if (!mySubjectId) navigate('/');
    else navigate(`/post/${mySubjectId}/answer`);
  };

  const handleChangeSort = (nextSort) => {
    setSearchParams({ page: '1', sort: nextSort });
  };

  const handleChangePage = (nextPage) => {
    setSearchParams({ page: String(nextPage), sort });
  };

  useEffect(() => {
    let alive = true;

    const fetchSubjects = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        const data = await getSubjects({ page, limit: 8, sort });

        // OpenMind는 보통 { count, next, previous, results } 형태 (Django 스타일)인 경우가 많음
        const list = data.results ?? data.items ?? [];
        const count = data.count ?? list.length;

        // limit과 totalPages 계산 (limit을 API에 보낸 값과 맞춰야 함)
        const limit = 8;
        const pages = Math.max(1, Math.ceil(count / limit));

        if (!alive) return;

        setSubjects(list);
        setTotalPages(pages);
      } catch (e) {
        if (!alive) return;
        setErrorMsg('목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    fetchSubjects();

    return () => {
      alive = false;
    };
  }, [page, sort]);

  return (
    <div className="list-page">
      <ListTopBar onClickLogo={handleGoHome} onClickGoAnswer={handleGoAnswer} />

      <div className="list-container">
        <ListHeader
          title="누구에게 질문할까요?"
          sort={sort}
          options={SORT_OPTIONS}
          onChangeSort={handleChangeSort}
        />

        {loading && <div className="list-state">로딩 중…</div>}
        {!loading && errorMsg && (
          <div className="list-state error">{errorMsg}</div>
        )}

        {!loading && !errorMsg && (
          <FeedGrid
            items={subjects}
            onClickCard={(id) => navigate(`/post/${id}`)}
          />
        )}

        <Pagination
          current={page}
          total={totalPages}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ListPage;

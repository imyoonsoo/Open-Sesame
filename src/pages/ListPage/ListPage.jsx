import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { subjectApi } from '@/api';

import ListTopBar from '@/components/list/ListTopBar/ListTopBar';
import ListHeader from '@/components/list/ListHeader/ListHeader';
import FeedGrid from '@/components/list/FeedGrid/FeedGrid';
import Pagination from '@/components/list/Pagination/Pagination';

import './ListPage.css';

// 정렬 옵션 (API에서 사용하는 값과 맞춰야 함)
const SORT_OPTIONS = [
  { label: '최신순', value: 'time' },
  { label: '이름순', value: 'name' },
];

function ListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query로 page, sort 상태 관리
  const page = Number(searchParams.get('page') ?? 1);
  const sort = searchParams.get('sort') ?? 'time';

  const [subjects, setSubjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 검색창에 입력 중인 값
  const [searchInput, setSearchInput] = useState('');

  // 실제 검색에 적용되는 값 (Enter 눌렀을 때만 반영)
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleGoHome = () => navigate('/');

  const handleGoAnswer = () => {
    // HomePage에서 생성된 subject id가 있으면 답변 페이지로 이동
    const mySubjectId = localStorage.getItem('openmind_subject_id');

    if (!mySubjectId) navigate('/');
    else navigate(`/post/${mySubjectId}/answer`);
  };

  const handleChangeSort = (nextSort) => {
    // 정렬 변경 시 페이지를 다시 1부터 시작
    setSearchParams({ page: '1', sort: nextSort });
  };

  const handleChangePage = (nextPage) => {
    setSearchParams({ page: String(nextPage), sort });
  };

  const handleSubmitSearch = () => {
    // Enter 눌렀을 때만 검색어 확정
    setSearchKeyword(searchInput);
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 setState 방지용 플래그
    let alive = true;

    const fetchSubjects = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        // 한 번에 가져올 카드 개수
        const limit = 8;

        // 페이지에 따라 offset 계산
        const offset = (page - 1) * limit;

        // API 호출
        const data = await subjectApi.getAll({ limit, offset, sort });

        // API 응답 구조
        // { count, results, next, previous }
        const list = data.results ?? [];
        const count = data.count ?? list.length;

        if (!alive) return;

        // 카드 목록 세팅
        setSubjects(list);

        // 전체 페이지 수 계산
        setTotalPages(Math.max(1, Math.ceil(count / limit)));
      } catch (e) {
        console.error('목록 조회 에러:', e);

        if (!alive) return;

        setErrorMsg('목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        if (!alive) return;

        setLoading(false);
      }
    };

    // 컴포넌트 렌더링 시 목록 불러오기
    fetchSubjects();

    return () => {
      alive = false;
    };
  }, [page, sort]);

  // 확정된 검색어 기준으로만 필터링
  const filteredSubjects = useMemo(() => {
    return subjects.filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [subjects, searchKeyword]);

  return (
    <div className="list-page">
      {/* 상단 네비게이션 */}
      <ListTopBar onClickLogo={handleGoHome} onClickGoAnswer={handleGoAnswer} />

      <div className="list-container">
        {/* 제목 + 정렬 + 검색 영역 */}
        <ListHeader
          title="질문하고 싶은 참깨는 누구인가요?"
          sort={sort}
          options={SORT_OPTIONS}
          onChangeSort={handleChangeSort}
          searchInput={searchInput}
          onChangeSearchInput={setSearchInput}
          onSubmitSearch={handleSubmitSearch}
        />

        {/* 로딩 상태 */}
        {loading && <div className="list-state">로딩 중…</div>}

        {/* 에러 상태 */}
        {!loading && errorMsg && (
          <div className="list-state error">{errorMsg}</div>
        )}

        {/* 카드 목록 */}
        {!loading && !errorMsg && (
          <FeedGrid
            items={filteredSubjects}
            onClickCard={(id) => navigate(`/post/${id}`)}
          />
        )}

        {/* 페이지네이션 */}
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
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

  // 한 페이지에 보여줄 카드 개수
  const LIMIT = 8;

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

    // 검색 시 페이지를 1페이지로 다시 맞춤
    setSearchParams({ page: '1', sort });
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 setState 방지용 플래그
    let alive = true;

    const fetchSubjects = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        // 먼저 전체 개수를 알아내기 위해 한 번 조회
        const firstData = await subjectApi.getAll({
          limit: LIMIT,
          offset: 0,
          sort,
        });

        const count = firstData.count ?? 0;

        // 전체 목록을 다시 가져와서 검색 + 페이지네이션에 사용
        const allData = await subjectApi.getAll({
          limit: count || LIMIT,
          offset: 0,
          sort,
        });

        const list = allData.results ?? [];

        if (!alive) return;

        // 전체 카드 목록 저장
        setSubjects(list);
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
  }, [sort]);

  // 확정된 검색어 기준으로만 필터링
  const filteredSubjects = useMemo(() => {
    return subjects.filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [subjects, searchKeyword]);

  // 필터링된 목록 기준으로 전체 페이지 수 계산
  useEffect(() => {
    const nextTotalPages = Math.max(
      1,
      Math.ceil(filteredSubjects.length / LIMIT)
    );

    setTotalPages(nextTotalPages);
  }, [filteredSubjects]);

  // 현재 페이지에 보여줄 카드만 잘라서 사용
  const pagedSubjects = useMemo(() => {
    const offset = (page - 1) * LIMIT;
    return filteredSubjects.slice(offset, offset + LIMIT);
  }, [filteredSubjects, page]);

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
            items={pagedSubjects}
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
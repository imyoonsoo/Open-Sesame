import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryState, parseAsInteger } from 'nuqs';

import ListTopBar from '@/components/list/ListTopBar/ListTopBar';
import ListHeader from '@/components/list/ListHeader/ListHeader';
import FeedGrid from '@/components/list/FeedGrid/FeedGrid';
import Pagination from '@/components/list/Pagination/Pagination';

import useSubjects from '@/hooks/useSubjects';
import useFilteredPagination from '@/hooks/useFilteredPagination';

import './ListPage.css';

// 정렬 옵션
const SORT_OPTIONS = [
  { label: '최신순', value: 'time' },
  { label: '이름순', value: 'name' },
];

function ListPage() {
  const navigate = useNavigate();

  // URL 쿼리로 페이지 상태 관리
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  // URL 쿼리로 정렬 상태 관리
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: 'time',
  });

  // 검색 입력값
  const [searchInput, setSearchInput] = useState('');

  // 실제 검색에 적용되는 값
  const [searchKeyword, setSearchKeyword] = useState('');

  // subject 목록 가져오는 로직은 훅으로 분리
  const { subjects, loading, errorMsg } = useSubjects(sort);

  // 검색 + 페이지네이션 계산 로직도 훅으로 분리
  const { pagedSubjects, totalPages } = useFilteredPagination(
    subjects,
    searchKeyword,
    page,
    setPage
  );

  // 홈 이동
  const handleGoHome = () => navigate('/');

  // 답변 페이지 이동
  const handleGoAnswer = () => {
    const mySubjectId = localStorage.getItem('openmind_subject_id');

    if (!mySubjectId) navigate('/');
    else navigate(`/post/${mySubjectId}/answer`);
  };

  // 정렬 변경
  const handleChangeSort = (nextSort) => {
    setSort(nextSort);

    // 정렬 바뀌면 페이지 초기화
    setPage(1);
  };

  // 페이지 변경
  const handleChangePage = (nextPage) => {
    setPage(nextPage);
  };

  // 검색 실행
  const handleSubmitSearch = () => {
    setSearchKeyword(searchInput);

    // 검색하면 다시 1페이지부터
    setPage(1);
  };

  return (
    <div className="list-page">
      {/* 상단 네비게이션 */}
      <ListTopBar onClickLogo={handleGoHome} onClickGoAnswer={handleGoAnswer} />

      <div className="list-container">
        {/* 제목 / 정렬 / 검색 영역 */}
        <ListHeader
          title="질문하고 싶은 참깨는 누구인가요?"
          sort={sort}
          options={SORT_OPTIONS}
          onChangeSort={handleChangeSort}
          searchInput={searchInput}
          onChangeSearchInput={setSearchInput}
          onSubmitSearch={handleSubmitSearch}
        />

        {/* 로딩 */}
        {loading && <div className="list-state">로딩 중…</div>}

        {/* 에러 */}
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

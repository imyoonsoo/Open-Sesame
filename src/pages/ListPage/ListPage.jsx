import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { subjectApi } from '@/api';

import ListTopBar from '@/components/list/ListTopBar/ListTopBar';
import ListHeader from '@/components/list/ListHeader/ListHeader';
import FeedGrid from '@/components/list/FeedGrid/FeedGrid';
import Pagination from '@/components/list/Pagination/Pagination';

import './ListPage.css';

// OpenMind API sort 값: time | name
const SORT_OPTIONS = [
  { label: '최신순', value: 'time' },
  { label: '이름순', value: 'name' },
];

function ListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // query string 기반으로 페이지/정렬 상태 관리 (/list?page=1&sort=time)
  const page = Number(searchParams.get('page') ?? 1);
  const sort = searchParams.get('sort') ?? 'time';

  const [subjects, setSubjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // 검색창에 입력 중인 값
  const [searchInput, setSearchInput] = useState('');

  // 실제 검색에 적용되는 값
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleGoHome = () => navigate('/');

  const handleGoAnswer = () => {
    // HomePage에서 생성한 subject id가 있으면 답변 페이지로 이동
    const mySubjectId = localStorage.getItem('openmind_subject_id');

    if (!mySubjectId) navigate('/');
    else navigate(`/post/${mySubjectId}/answer`);
  };

  const handleChangeSort = (nextSort) => {
    // 정렬이 바뀌면 1페이지부터 다시
    setSearchParams({ page: '1', sort: nextSort });
  };

  const handleChangePage = (nextPage) => {
    setSearchParams({ page: String(nextPage), sort });
  };

  const handleSubmitSearch = () => {
    // Enter를 눌렀을 때만 검색어 적용
    setSearchKeyword(searchInput);
  };

  useEffect(() => {
    // alive는 "컴포넌트가 아직 화면에 살아있는지" 체크하는 플래그
    // 비동기 요청(fetch) 도중 페이지 이동/언마운트가 되면,
    // 요청이 끝난 뒤 setState가 실행되면서 경고/버그가 날 수 있어서 방지용으로 씀
    let alive = true;

    // 실제 API 요청을 하는 함수 (async/await 사용)
    const fetchSubjects = async () => {
      // 요청 시작: 로딩 표시 켜고 에러는 초기화
      setLoading(true);
      setErrorMsg('');

      try {
        // OpenMind API는 page가 아니라 limit/offset 방식
        // limit: 한 번에 가져올 개수 (카드 8개 보여주면 8로)
        const limit = 8;

        // offset: 앞에서 몇 개를 건너뛸지
        // page=1 → offset=0 (0개 건너뜀)
        // page=2 → offset=8 (8개 건너뜀)
        const offset = (page - 1) * limit;

        // API 호출 (openmindApi.js의 getSubjects 사용)
        // 실제 요청 URL 예: /subjects/?limit=8&offset=0&sort=time
        const data = await subjectApi.getAll({ limit, offset, sort });

        // API 응답 구조: { count: 전체 개수, results: 현재 페이지 데이터, next, previous }
        const list = data.results ?? []; // results가 없을 때를 대비해 빈 배열
        const count = data.count ?? list.length; // count가 없으면 list 길이로 대체

        // 언마운트된 상태면 여기서 중단 (setState 방지)
        if (!alive) return;

        // 화면에 뿌릴 목록 세팅
        // 실제 화면에는 원본 list 대신 testList를 넣음
        setSubjects(list);

        // 총 페이지 수 계산
        // count=전체 데이터 개수, limit=한 페이지에 보여줄 개수
        // 예) count=24, limit=8 → 3페이지
        setTotalPages(Math.max(1, Math.ceil(count / limit)));
      } catch (e) {
        // 요청 실패 시 사용자에게 보여줄 에러 메시지 세팅
        // (alive 체크는 위와 동일하게 안전장치)
        console.error('목록 조회 에러:', e);
        if (!alive) return;
        setErrorMsg('목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        // 성공/실패 관계없이 로딩은 꺼야 함
        // 단, 언마운트된 상태면 setState 하지 않도록 체크
        if (!alive) return;
        setLoading(false);
      }
    };

    // useEffect 실행되면 즉시 목록 조회 함수 호출
    fetchSubjects();

    // cleanup 함수: 컴포넌트가 사라질 때 실행됨
    // alive를 false로 바꿔서, 요청이 끝나도 setState가 실행되지 않게 막음
    return () => {
      alive = false;
    };

    // 의존성 배열:
    // page나 sort가 바뀔 때마다 다시 목록을 불러와야 함
  }, [page, sort]);

  // Enter로 확정된 검색어 기준으로만 필터링
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
        {/* 제목 + 정렬 + 검색 */}
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

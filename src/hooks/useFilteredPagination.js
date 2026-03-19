import { useEffect, useMemo, useState } from 'react';

// 한 페이지 카드 개수
const LIMIT = 8;

function useFilteredPagination(subjects, searchKeyword, page, setPage) {
  // 전체 페이지 수
  const [totalPages, setTotalPages] = useState(1);

  // 검색어 기준으로 목록 필터링
  const filteredSubjects = useMemo(() => {
    return subjects.filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [subjects, searchKeyword]);

  useEffect(() => {
    // 검색 결과 개수 기준으로 전체 페이지 계산
    const nextTotalPages = Math.max(
      1,
      Math.ceil(filteredSubjects.length / LIMIT)
    );

    setTotalPages(nextTotalPages);

    // 현재 page가 범위를 벗어나면 마지막 페이지로 보정
    if (page > nextTotalPages) {
      setPage(nextTotalPages);
    }
  }, [filteredSubjects, page, setPage]);

  // 현재 페이지에 보여줄 데이터만 잘라서 사용
  const pagedSubjects = useMemo(() => {
    const offset = (page - 1) * LIMIT;
    return filteredSubjects.slice(offset, offset + LIMIT);
  }, [filteredSubjects, page]);

  return {
    pagedSubjects,
    totalPages,
  };
}

export default useFilteredPagination;

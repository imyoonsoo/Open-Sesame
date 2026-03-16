import { useEffect, useState } from 'react';
import { subjectApi } from '@/api';

// 한 페이지 카드 개수
const LIMIT = 8;

function useSubjects(sort) {
  // 서버에서 가져온 전체 subject 목록
  const [subjects, setSubjects] = useState([]);

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // 에러 메시지
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // 컴포넌트 언마운트 후 setState 실행 방지용
    let alive = true;

    const fetchSubjects = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        // 먼저 전체 개수를 확인
        const firstData = await subjectApi.getAll({
          limit: LIMIT,
          offset: 0,
          sort,
        });

        const count = firstData.count ?? 0;

        // 전체 데이터를 가져와서 프론트에서 검색/페이지네이션 처리
        const allData = await subjectApi.getAll({
          limit: count || LIMIT,
          offset: 0,
          sort,
        });

        if (!alive) return;

        setSubjects(allData.results ?? []);
      } catch (e) {
        console.error('목록 조회 에러:', e);

        if (!alive) return;

        setErrorMsg('목록을 불러오지 못했습니다.');
      } finally {
        if (!alive) return;

        setLoading(false);
      }
    };

    fetchSubjects();

    return () => {
      alive = false;
    };
  }, [sort]);

  // 필요한 상태만 반환
  return { subjects, loading, errorMsg };
}

export default useSubjects;
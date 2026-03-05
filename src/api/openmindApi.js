import axios from '../utils/axios';

/**
 * 질문 대상(Subject) 목록 조회
 * GET /subjects/
 *
 * ⚠️ 정렬/페이지 파라미터 이름은 실제 Swagger에 맞춰 조정하세요.
 * (아래는 흔한 형태로 구성)
 */
export const getSubjects = async ({ page = 1, limit = 8, sort = 'latest' }) => {
  const res = await axios.get('/subjects/', {
    params: { page, limit, sort },
  });

  return res.data;
};
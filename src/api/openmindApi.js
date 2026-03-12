import axios from '@/utils/axios';

export const createSubject = async (name) => {
  const res = await axios.post('/subjects/', { name });
  return res.data;
};

// 질문 대상(Subject) 목록 조회 API
// limit : 한 번에 가져올 데이터 개수
// offset : 몇 개의 데이터를 건너뛸지 (페이지 계산에 사용)
// sort : 정렬 기준 (time | name)
export const getSubjects = async ({ limit = 8, offset = 0, sort = 'time' }) => {
  // /subjects/ 엔드포인트로 GET 요청
  // params로 전달한 값은 query string으로 변환됨
  const res = await axios.get('/subjects/', {
    params: { limit, offset, sort },
  });

  // 실제 데이터는 res.data 안에 들어 있음
  return res.data;
};

// 대상(Subject) 세부 정보 조회
export const getSubject = async (subjectId) => {
  const res = await axios.get(`/subjects/${subjectId}/`);
  return res.data;
};

// 대상(Subject)의 질문 목록 조회 API
export const getQuestions = async (
  subjectId,
  { limit = 8, offset = 0 } = {}
) => {
  const res = await axios.get(`/subjects/${subjectId}/questions/`, {
    params: { limit, offset },
  });
  return res.data;
};

// 답변 생성 API
export const createAnswer = async (questionId, data) => {
  const res = await axios.post(`/questions/${questionId}/answers/`, data);
  return res.data;
};

/*질문 생성*/
export const postQuestion = async (subjectId, content) => {
  const response = await axios.post(`/subjects/${subjectId}/questions/`, {
    content,
  });
  return response.data;
};
